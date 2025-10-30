import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from 'mobx';
import { loginApi } from '../apis/authApi';

interface UserCredentials {
  email: string;
  password: string;
  id?: string;
  isAdmin?: boolean;
}

const USERS: UserCredentials[] = [
  { email: 'admin@gmail.com', password: 'Admin@123', isAdmin: true, id: '0' },
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

export interface UserInfo {
  id: string;
  fullName: string;
  email: string;
  username: string;
  isAdmin: boolean;
  token: string;
  initials?: string;
}

class AuthStore {
  token: string | null = null;
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

    this.initializeFromStorage();
  }

  private initializeFromStorage() {
    if (!this.isLocalStorageAvailable()) return;

    const storedToken = localStorage.getItem('auth_token');
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

  login = async (email: string, password: string): Promise<boolean> => {
    this.isLoading = true;
    this.error = null;

    if (!email || !password) {
      this.error = 'Email and password are required';
      this.isLoading = false;
      return false;
    }

    try {
      // Find the user in our USERS array
      const user = USERS.find(u => u.email === email && u.password === password);
      console.log('Found user:', user); // Debug log

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // For demo purposes, we'll skip the actual API call
      // In a real app, you would make an API call here
      // const response = await loginApi({ email, password });
      // if (!response?.data) {
      //   throw new Error('Invalid response from server');
      // }

      const username = user.email.split('@')[0];
      const userInfo: UserInfo = {
        id: user.id || `user_${Date.now()}`,
        fullName: username,
        email: user.email,
        username: username,
        isAdmin: user.isAdmin === true, // Ensure boolean value
        token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        initials: username.substring(0, 2).toUpperCase()
      };

      console.log('User info to be saved:', userInfo); // Debug log

      runInAction(() => {
        this.userInfo = userInfo;
        this.token = userInfo.token;

        if (this.isLocalStorageAvailable()) {
          try {
            localStorage.setItem('auth_token', userInfo.token);
            localStorage.setItem('user_info', JSON.stringify(userInfo));
            console.log('User data saved to localStorage'); // Debug log
          } catch (storageError) {
            console.error('Failed to save auth data to storage:', storageError);
          }
        }
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

  logout = (): void => {
    this.token = null;
    this.userInfo = null;
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
    }
  };

  setError = (message: string) => {
    this.error = message;
  };

  private isLocalStorageAvailable(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('localStorage is not available:', e);
      return false;
    }
  }

  loadUserInfoFromStorage = (): void => {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    try {
      const userInfo = localStorage.getItem('user_info');
      if (!userInfo) {
        this.logout();
        return;
      }

      const parsedUser = JSON.parse(userInfo);

      if (parsedUser &&
        typeof parsedUser === 'object' &&
        'id' in parsedUser &&
        'email' in parsedUser &&
        'token' in parsedUser) {

        const safeUserInfo: UserInfo = {
          id: String(parsedUser.id),
          email: String(parsedUser.email),
          username: String(parsedUser.username || parsedUser.email.split('@')[0]),
          fullName: String(parsedUser.fullName || parsedUser.email.split('@')[0]),
          isAdmin: Boolean(parsedUser.isAdmin),
          token: String(parsedUser.token),
          initials: String(parsedUser.initials || parsedUser.email.substring(0, 2).toUpperCase())
        };

        runInAction(() => {
          this.userInfo = safeUserInfo;
          this.token = safeUserInfo.token;
        });
      } else {
        throw new Error('Invalid user data structure in storage');
      }
    } catch (error) {
      console.error('Failed to load user info from storage:', error);
      this.logout();
    }
  };
}

const authStore = new AuthStore();
export default authStore;
export { AuthStore };
