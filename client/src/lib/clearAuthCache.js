/**
 * Clear authentication cache and locks
 * Run this on app initialization to prevent lock issues
 */
export const clearAuthCache = () => {
  try {
    // Clear any stuck locks
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('lock.clinroute-auth') || 
          (key.includes('supabase') && key.includes('lock'))) {
        console.log('Clearing stuck lock:', key);
        localStorage.removeItem(key);
      }
    });
    
    console.log('✅ Auth locks cleared');
  } catch (error) {
    console.warn('Failed to clear auth cache:', error);
  }
};

export default clearAuthCache;
