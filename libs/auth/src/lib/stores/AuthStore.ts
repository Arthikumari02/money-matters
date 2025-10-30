import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import axios from 'axios';

// User credentials mapping
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

export interface UserInfo {
  id: string;
  email: string;
  isAdmin: boolean;
  name: string;
  token: string;
}

class AuthStore {
  token: string | null = localStorage.getItem('auth_token') || null;
  userInfo: UserInfo | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      // Observable properties
      token: observable,
      userInfo: observable,
      isLoading: observable,
      error: observable,

      // Computed properties
      isAuthenticated: computed,
      isAdmin: computed,

      // Actions
      login: action,
      logout: action,
      setError: action,
    });

    // Load user info from storage if token exists
    if (this.token) {
      this.loadUserInfoFromStorage();
    }
  }

  get isAuthenticated(): boolean {
    return !!this.token && !!this.userInfo;
  }

  get isAdmin(): boolean {
    return this.userInfo?.isAdmin || false;
  }

  login = async (email: string, password: string): Promise<boolean> => {
    this.isLoading = true;
    this.error = null;

    try {
      // Find user in the credentials list
      const user = USERS.find(u => u.email === email && u.password === password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Mock API call to get user ID
      const response = await axios.get('https://bursting-gelding-24.hasura.app/api/rest/get-user-id', {
        params: { email: user.email }
      });

      const userInfo: UserInfo = {
        id: user.id || response.data.id || '',
        email: user.email,
        isAdmin: user.isAdmin || false,
        name: user.email.split('@')[0],
        token: `token_${Date.now()}`,
      };

      runInAction(() => {
        this.userInfo = userInfo;
        this.token = userInfo.token;
        localStorage.setItem('auth_token', userInfo.token);
        localStorage.setItem('user_info', JSON.stringify(userInfo));
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
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
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
  };

  setError = (message: string | null): void => {
    this.error = message;
  };

  private loadUserInfoFromStorage = (): void => {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      try {
        this.userInfo = JSON.parse(userInfo);
      } catch (error) {
        console.error('Failed to parse user info from storage', error);
        this.logout();
      }
    }
  };

}

const authStore = new AuthStore();
export default authStore;
export { AuthStore };
