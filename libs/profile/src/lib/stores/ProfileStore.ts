import { makeAutoObservable, reaction } from 'mobx';
import { Profile, IProfile, UpdateProfileDTO } from '../models/ProfileModel';

class ProfileStore {
    private _profile: Profile | null = null;
    private _isLoading = false;
    private _error: string | null = null;

    private subscribers: (() => void)[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    subscribe(callback: () => void) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(cb => cb !== callback);
        };
    }

    private notifySubscribers() {
        this.subscribers.forEach(cb => cb());
    }

    get profile(): Profile | null {
        return this._profile;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get error(): string | null {
        return this._error;
    }

    setProfile(profile: Profile | IProfile | null): void {
        if (!profile) {
            this._profile = null;
        } else if (profile instanceof Profile) {
            this._profile = profile;
        } else {
            this._profile = new Profile(profile);
        }
        this._error = null;
        this.notifySubscribers();
    }

    setLoading(isLoading: boolean): void {
        this._isLoading = isLoading;
        this.notifySubscribers();
    }

    setError(error: string | null): void {
        this._error = error;
        this.notifySubscribers();
    }

    async fetchProfile(profileId: string): Promise<Profile | null> {
        this.setLoading(true);
        try {
            const mockProfileData = {
                id: `profile_${profileId}`,
                userId: profileId,
                firstName: 'John',
                lastName: 'Doe',
                email: `user${profileId}@example.com`,
                phoneNumber: '+1234567890',
                avatarUrl: 'https://via.placeholder.com/150',
                dateOfBirth: new Date('1990-01-01'),
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const profile = new Profile({
                ...mockProfileData,
                dateOfBirth: mockProfileData.dateOfBirth,
                createdAt: mockProfileData.createdAt,
                updatedAt: mockProfileData.updatedAt,
            });

            this.setProfile(profile);
            return profile;
        } catch (error) {
            this.setError(error instanceof Error ? error.message : 'Failed to fetch profile');
            return null;
        } finally {
            this.setLoading(false);
        }
    }

    async updateProfile(profileId: string, data: UpdateProfileDTO): Promise<Profile | null> {
        this.setLoading(true);
        try {
            return null;
        } catch (error) {
            this.setError(error instanceof Error ? error.message : 'Failed to update profile');
            return null;
        } finally {
            this.setLoading(false);
        }
    }
}

export const profileStore = new ProfileStore();
