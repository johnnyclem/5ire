<div align="center">
  <a href="https://github.com/johnnyclem/souls">
    <img src="https://framerusercontent.com/images/piSqJSZ61vTwYg6v2Rd4NdUt8.jpg" alt="Logo" width="120">
  </a>
  <br />
   <h1>A Personal AI Agent & MCP Client</h1>
   <div>
     <img src="https://img.shields.io/badge/license-Apache%202.0-brightgreen?style=flat"/>
  </div>
  <br />
  <p>
    <br />
    <div style="display:flex;justify-content:space-around;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:15px;">
    <span style="font-size:12px;">OpenAI</span>
    <span style="font-size:12px;">/ Azure</span>
    <span style="font-size:12px;">/ Anthropic</span>
    <span style="font-size:12px;">/ Google</span>
    <span style="font-size:12px;">/ Baidu</span>
    <span style="font-size:12px;">/ Mistral</span>
    <span style="font-size:12px;">/ Moonshot</span>
    <span style="font-size:12px;">/ Doubao</span>
    <span style="font-size:12px;">/ Grok</span>
    <span style="font-size:12px;">/ DeepSeek</span>
    <span style="font-size:12px;">/ Ollama</span>
  </div>
  </p>
</div>
<br />


 ### Before to activating tools feature, ensure the following components are installed:

- Python
- Node.js
- uv (Python package manager)


These components are required as they constitute the runtime environment for the MCP Server. If you don't anticipate using the tools feature immediately, you may choose to skip this installation step and complete it later when the need arises.

For detailed installation instructions, please see our [Installation Guide](INSTALLATION.md).

<br />

# Features

## ⚒️ Support Tools via MCP Servers
MCP is an open protocol that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools.

With tools, you can access the file system, obtain system information, interact with databases, access remote data, and more, rather than just having a simple conversation.

https://github.com/user-attachments/assets/5aa98f2b-c26d-435e-8196-73fa414066eb

We have created an open [marketplace for MCP Servers](https://github.com/johnnyclem/think-index). it empowers users to discover exceptional tools while offering a streamlined process for sharing their own MCP server creations.

https://github.com/user-attachments/assets/be66c30e-bb29-4dfe-9f25-8d396470ed60

## 💡 Local Knowledge Base
We have integrated the bge-m3 as our local embedding model, which excels in multilingual vectorization. Souls now supports parsing and vectorization of docx, xlsx, pptx, pdf, txt, and csv documents, enabling storage of these vectors to power robust Retrieval-Augmented Generation (RAG) capabilities locally.

![Local Knowledge Base Screenshot](https://sou.ls/knowledge.png)

## 📈 Usage Analytics
By keeping track of your API usage and spending, you can gain a better understanding of how much you're spending on the API and make informed decisions to optimize your use of the service.

![Usage Analytics Screenshot](https://sou.ls/analytics.png)

## ✨ Prompts Library
The prompt library provides an effective way to create and organize your own prompts. These prompts are highly versatile, thanks to their support for variables.

![Prompts Library Screenshot](https://sou.ls/prompts.png)

## 🔖 Bookmarks
You can bookmark each conversation, and even if the original messages are deleted, the saved bookmarked content remains unaffected.
![Bookmarks Screenshot](https://sou.ls/bookmarks.png)

## 🔍 Quick Search
You can perform keyword searches across all conversations, quickly pinpointing the information you need.
![Search Screenshot](https://sou.ls/search.png)


> [!TIP]
> Since Souls uses native dependencies, it needs to be packaged on the corresponding platform. If it is on Mac OS, you may also need to configure APPLE_TEAM_ID, APPLE_ID, and APPLE_ID_PASS for notarization to avoid security alerts.


<hr/>

##  Discover Exceptional MCP Servers

> [!TIP]
> [MCPSvr](https://github.com/johnnyclem/think-index), a community-driven directory of MCP servers, empowers developers to discover exceptional tools while offering a streamlined process for sharing their own MCP server creations.
