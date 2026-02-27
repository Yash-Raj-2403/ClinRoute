import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Some features may not work.');
}

// Create a singleton instance to prevent lock issues
let supabaseInstance = null;

const getSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      supabaseUrl || '',
      supabaseAnonKey || '',
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          flowType: 'pkce',
          storage: window.localStorage,
          storageKey: 'clinroute-auth'
        }
      }
    );
  }
  return supabaseInstance;
};

export const supabase = getSupabaseClient();

export default supabase;
