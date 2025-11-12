import { makeObservable, observable, computed, action, runInAction } from 'mobx';

export interface UserInfo {
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
      logout: action,
      setError: action,
      setUserInfo: action,
      setToken: action,
      setLoading: action,
    });

    this.loadUserInfoFromStorage();
  }

  private loadUserInfoFromStorage() {
    if (typeof window === 'undefined') return;

    const token = this.getLocalStorageItem('auth_token');
    const userInfo = this.getLocalStorageItem('user_info');

    if (token && userInfo) {
      try {
        runInAction(() => {
          this.token = token;
          this.userInfo = JSON.parse(userInfo);
        });
      } catch (e) {
        console.error('Failed to parse user info from localStorage', e);
        this.clearAuthData();
      }
    }
  }

  get isAuthenticated(): boolean {
    return !!this.token && !!this.userInfo;
  }

  get isAdmin(): boolean {
    return this.userInfo?.isAdmin || false;
  }

  setLoading = (loading: boolean): void => {
    this.isLoading = loading;
  };

  setError = (message: string | null): void => {
    this.error = message;
  };

  setUserInfo = (userInfo: UserInfo): void => {
    this.userInfo = userInfo;
    this.setLocalStorageItem('user_info', JSON.stringify(userInfo));
  };

  setToken = (token: string): void => {
    this.token = token;
    this.setLocalStorageItem('auth_token', token);
  };

  logout = (): void => {
    this.clearAuthData();
  };

  private clearAuthData = (): void => {
    this.token = null;
    this.userInfo = null;
    this.error = null;
    this.removeLocalStorageItem('auth_token');
    this.removeLocalStorageItem('user_info');
  };

  private getLocalStorageItem(key: string): string | null {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.error('Error accessing localStorage:', e);
      return null;
    }
  }

  private setLocalStorageItem(key: string, value: string): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.error('Error setting localStorage:', e);
    }
  }

  private removeLocalStorageItem(key: string): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage:', e);
    }
  }
}

const authStore = new AuthStore();
export default authStore;
export { AuthStore };

