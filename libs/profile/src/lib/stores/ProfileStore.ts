import { makeAutoObservable } from 'mobx';
import { Profile, IProfile } from '../models/ProfileModel';

export class ProfileStore {
  private _profile: Profile | null = null;
  private _isLoading = false;
  private _error: string | null = null;

  constructor(
    private profileApi: { getProfile: (userId: string) => Promise<IProfile> }
  ) {
    makeAutoObservable(this);
  }

  get profile() {
    return this._profile;
  }

  get isLoading() {
    return this._isLoading;
  }

  get error() {
    return this._error;
  }

  private setProfile(profileData: IProfile | null) {
    this._profile = profileData ? new Profile(profileData) : null;
    this._error = null;
  }

  private setLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  private setError(error: string | null) {
    this._error = error;
  }

  async fetchProfile(userId: string) {
    console.log('ProfileStore: fetchProfile called with userId:', userId);
    this.setLoading(true);
    this.setError(null);

    try {
      console.log('ProfileStore: Calling profileApi.getProfile...');
      const profileData = await this.profileApi.getProfile(userId);
      console.log('ProfileStore: Profile data received:', profileData);

      if (!profileData) {
        throw new Error('No profile data received from API');
      }

      this.setProfile(profileData);
      console.log('ProfileStore: Profile set successfully');
      return profileData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch profile';
      console.error('ProfileStore: Error fetching profile:', error);
      this.setError(errorMessage);
      throw error;
    } finally {
      this.setLoading(false);
      console.log('ProfileStore: fetchProfile completed');
    }
  }
}
