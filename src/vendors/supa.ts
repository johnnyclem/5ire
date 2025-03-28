import useAuthStore from 'stores/useAuthStore';
import Debug from 'debug';
import { createClient } from '@supabase/supabase-js';
import { captureException } from '../renderer/logging';

const debug = Debug('souls:vendors:supa');

const supabase = createClient(
  `https://${window.envVars.SUPA_PROJECT_ID}.supabase.co`,
  window.envVars.SUPA_KEY as string,
);

export async function fetchById<Type>(
  table: string,
  id: number,
  columns: string = '*',
): Promise<Type> {
  const { data, error } = await supabase
    .from(table)
    .select(columns)
    .eq('id', id)
    .single();
  if (error) {
    debug(error);
    captureException(error);
    throw error;
  }
  return data as Type;
}

export async function fetchMime<Type>(
  table: string,
  columns: string = '*',
): Promise<Type[]> {
  const { user } = useAuthStore.getState();
  if (!user) {
    throw Error('Your session is expired, please sign in.');
  }
  const { data, error } = await supabase
    .from(table)
    .select(columns)
    .eq('created_by', user.id);
  if (error) {
    debug(error);
    captureException(error);
    throw error;
  }
  return data as Type[];
}

export default supabase;
