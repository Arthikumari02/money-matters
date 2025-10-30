// Safe access to browser APIs that might not be available in SSR
type StorageType = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

export const safeLocalStorage: StorageType = {
  getItem: (key: string) => {
    try {
      return typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
    } catch (e) {
      console.warn('localStorage is not available', e);
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn('Failed to set localStorage item', e);
    }
  },
  removeItem: (key: string) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn('Failed to remove localStorage item', e);
    }
  },
};
