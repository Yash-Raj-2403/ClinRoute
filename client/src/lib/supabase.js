import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Some features may not work.');
}

// Custom storage implementation to avoid lock issues
const customStorage = {
  getItem: (key) => {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.warn('Storage getItem error:', error);
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Storage setItem error:', error);
    }
  },
  removeItem: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn('Storage removeItem error:', error);
    }
  },
};

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
          storage: customStorage,
          storageKey: 'clinroute-auth'
        }
      }
    );
  }
  return supabaseInstance;
};

export const supabase = getSupabaseClient();

export default supabase;
