import Debug from 'debug';
import {
  IChatContext,
  IChatRequestMessage,
  IMCPTool,
  IOpenAITool,
  IAnthropicTool,
  IGoogleTool,
  IChatRequestPayload,
  IChatRequestMessageContent,
} from 'intellichat/types';
import { ITool } from 'intellichat/readers/IChatReader';
import OpenAIReader from 'intellichat/readers/OpenAIReader';
import { stripHtmlTags, urlJoin, splitByImg } from 'utils/util';
import NextChatService from './NextChatService';
import INextChatService from './INextCharService';
import VeniceAI from '../../providers/VeniceAI';

const debug = Debug('souls:intellichat:VeniceAIChatService');

export default class VeniceAIChatService
  extends NextChatService
  implements INextChatService
{
  constructor(context: IChatContext) {
    super({
      context,
      provider: VeniceAI,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected getReaderType() {
    return OpenAIReader;
  }

  protected async convertPromptContent(content: string) {
    if (this.context.getModel().vision?.enabled) {
      const items = splitByImg(content);
      const result: IChatRequestMessageContent[] = [];
      items.forEach((item: any) => {
        if (item.type === 'image') {
          result.push({
            type: 'image_url',
            image_url: {
              url: item.data,
            },
          });
        } else if (item.type === 'text') {
          result.push({
            type: 'text',
            text: item.data,
          });
        } else {
          throw new Error('Unknown message type');
        }
      });
      return result;
    }
    return stripHtmlTags(content);
  }

  protected async makeMessages(
    messages: IChatRequestMessage[]
  ): Promise<IChatRequestMessage[]> {
    const result: IChatRequestMessage[] = [];
    const systemMessage = this.context.getSystemMessage();
    if (systemMessage) {
      result.push({
        role: 'system',
        content: systemMessage,
      });
    }
     
    // For Venice, don't include previous assistant messages
    // Only include the most recent user messages
    const ctxMessages = this.context.getCtxMessages();
    ctxMessages.forEach(msg => {
      // Add only user messages and combine with previous assistant response
      const combinedContent = msg.prompt + 
        (msg.reply ? "\n\nPrevious assistant response: " + msg.reply : "");
      result.push({
        role: 'user',
        content: combinedContent,
      });
    });

    const processedMessages = await Promise.all(
      messages.map(async (msg) => {
        if (msg.role === 'tool') {
          return {
            role: 'user' as 'user',
            content: `Tool result from ${msg.name}: ${JSON.stringify(msg.content)}`,
          };
        }
        if (msg.role === 'assistant' && msg.tool_calls) {
          // Skip assistant messages with tool calls for Venice
          return null;
        }
        const { content } = msg;
        if (typeof content === 'string') {
          return {
            role: 'user',
            content: await this.convertPromptContent(content),
          };
        }
        return {
          role: 'user',
          content,
        };
      }),
    );
    
    // Filter out null messages
    const validMessages = processedMessages.filter(msg => msg !== null) as IChatRequestMessage[];
    result.push(...validMessages);
    
    return result;
  }

  // eslint-disable-next-line class-methods-use-this
  protected makeTool(
    tool: IMCPTool
  ): IOpenAITool | IAnthropicTool | IGoogleTool {
    return {
      type: 'function',
      function: {
        name: tool.name,
        description: tool.description?.substring(0, 1000),
        parameters: {
          type: tool.inputSchema.type,
          properties: tool.inputSchema.properties || {},
          required: tool.inputSchema.required || [],
          additionalProperties: tool.inputSchema.additionalProperties || false,
        },
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  protected makeToolMessages(
    tool: ITool,
    toolResult: any
  ): IChatRequestMessage[] {
    // Return the tool result as a user message rather than an assistant+tool message pair
    // This is a workaround for Venice's API limitations with tool calls
    return [{
      role: 'user' as 'user',
      content: `Tool ${tool.name} was called with arguments: ${JSON.stringify(tool.args)}\n\nTool result: ${typeof toolResult === 'string' ? toolResult : JSON.stringify(toolResult.content)}`,
    }];
  }

  protected async makePayload(message: IChatRequestMessage[]): Promise<IChatRequestPayload> {
    const modelName = this.getModelName() as string;
    const messages = await this.makeMessages(message);
    
    // Ensure all messages have valid roles according to Venice API requirements
    const validMessages = messages.map(msg => {
      // Make sure all messages have either user or system role
      if (msg.role !== 'user' && msg.role !== 'system') {
        return {
          role: 'user' as 'user',
          content: `${msg.role}: ${typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}`
        };
      }
      return msg;
    });
    
    // Keep payload simple for Venice API
    const payload: IChatRequestPayload = {
      model: modelName,
      messages: validMessages,
      temperature: this.context.getTemperature(),
      stream: true,
    };
    
    // Only add max_tokens if it's specified
    if (this.context.getMaxTokens()) {
      payload.max_tokens = this.context.getMaxTokens();
    }
    
    return payload;
  }

  protected async makeRequest(messages: IChatRequestMessage[]): Promise<Response> {
    const payload = await this.makePayload(messages);
    debug('About to make a request, payload:\r\n', payload);
    const { base, key } = this.apiSettings;
    const url = urlJoin('/chat/completions', base);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(payload),
      signal: this.abortController.signal,
    });
    return response;
  }
} 