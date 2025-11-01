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
    this.setLoading(true);
    try {
      const profileData = await this.profileApi.getProfile(userId);
      console.log('Profile fetched:', profileData);
      this.setProfile(profileData);
    } catch (error) {
      this.setError(
        error instanceof Error ? error.message : 'Failed to fetch profile'
      );
    } finally {
      this.setLoading(false);
    }
  }
}
