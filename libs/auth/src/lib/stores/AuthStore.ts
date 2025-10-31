import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from 'mobx';
import { loginApi } from '../apis/authApi';

declare global {
  interface Window {
    localStorage: Storage;
  }
  const window: Window & typeof globalThis;
}

const USERS = [
  { email: 'admin@gmail.com', password: 'Admin@123', isAdmin: true },
  { email: 'jane.doe@gmail.com', password: 'janedoe@123', id: '1' },
  { email: 'samsmith@gmail.com', password: 'samsmith@123', id: '2' },
  { email: 'rahul@gmail.com', password: 'rahul@123', id: '4' },
  { email: 'teja@gmail.com', password: 'teja@123', id: '5' },
  { email: 'loki@gmail.com', password: 'loki@123', id: '6' },
  { email: 'ramesh@gmail.com', password: 'ramesh@123', id: '7' },
  { email: 'suresh@gmail.com', password: 'suresh@123', id: '8' },
  { email: 'prem@gmail.com', password: 'prem@123', id: '9' },
  { email: 'piyush@gmail.com', password: 'piyush@123', id: '10' },
  { email: 'isha@gmail.com', password: 'isha@123', id: '12' },
  { email: 'seema@gmail.com', password: 'seema@123', id: '14' },
  { email: 'seema@123', password: 'arjun@123', id: '15' },
  { email: 'radha@gmail.com', password: 'radha@123', id: '16' },
  { email: 'phani@gmail.com', password: 'phani@123', id: '17' },
];

interface UserInfo {
  id: string;
  fullName?: string;
  initials?: string;
  email: string;
  username?: string;
  isAdmin: boolean;
  token: string;
  name?: string;
}

class AuthStore {
  token: string | null = null;
  cliendId: string | null = null;
  userInfo: UserInfo | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      token: observable,
      userInfo: observable,
      isLoading: observable,
      error: observable,
      isAuthenticated: computed,
      isAdmin: computed,
      login: action,
      logout: action,
      setError: action,
    });

    // Load token from localStorage on initialization
    const storedToken = this.getLocalStorageItem('auth_token');
    if (storedToken) {
      this.token = storedToken;
      this.loadUserInfoFromStorage();
    }

  }


  get isAuthenticated() {
    return !!this.token && !!this.userInfo;
  }
  get isAdmin() {
    return this.userInfo?.isAdmin || false;
  }

  login = async (email: string, password: string) => {
    this.isLoading = true;
    this.error = null;
    try {
      const user = USERS.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) throw new Error('Invalid email or password');

      // Pass both email and password as an object to match the interface
      const response = await loginApi({ email, password });

      const userInfo: UserInfo = {
        id: user.id || (response?.data?.id || ''),
        email: user.email,
        isAdmin: user.isAdmin || false,
        fullName: user.email.split('@')[0],
        initials: user.email[0].toUpperCase(),
        username: user.email.split('@')[0],
        token: `token_${Date.now()}`,
        name: user.email.split('@')[0], // Keep for backward compatibility
      };

      runInAction(() => {
        this.userInfo = userInfo;
        this.token = userInfo.token;
        this.setLocalStorageItem('auth_token', userInfo.token);
        this.setLocalStorageItem('user_info', JSON.stringify(userInfo));
      });

      return true;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Login failed';
      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  logout = () => {
    this.token = null;
    this.userInfo = null;
    this.removeLocalStorageItem('auth_token');
    this.removeLocalStorageItem('user_info');
  };

  setError = (message: string | null) => {
    this.error = message;
  };

  // Helper to safely access localStorage in both browser and Node.js
  private getLocalStorageItem(key: string): string | null {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.error('Error accessing localStorage:', e);
      return null;
    }
  }

  // Helper to safely set localStorage in both browser and Node.js
  private setLocalStorageItem(key: string, value: string): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.error('Error setting localStorage:', e);
    }
  }

  // Helper to safely remove localStorage in both browser and Node.js
  private removeLocalStorageItem(key: string): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage:', e);
    }
  }

  loadUserInfoFromStorage = () => {
    const userInfo = this.getLocalStorageItem('user_info');
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        // Only set user info if the token matches
        if (this.token === parsedUserInfo.token) {
          // Ensure all required fields are present
          this.userInfo = {
            ...parsedUserInfo,
            fullName: parsedUserInfo.fullName || parsedUserInfo.name || parsedUserInfo.email.split('@')[0],
            initials: parsedUserInfo.initials || (parsedUserInfo.name || parsedUserInfo.email[0]).toUpperCase(),
            username: parsedUserInfo.username || parsedUserInfo.email.split('@')[0]
          };
        } else {
          // If token doesn't match, clear everything
          this.logout();
        }
      } catch {
        this.logout();
      }
    } else {
      // If no user info is found but we have a token, clear it
      if (this.token) {
        this.logout();
      }
    }
  };
}

const authStore = new AuthStore();
export default authStore;
export { AuthStore };
