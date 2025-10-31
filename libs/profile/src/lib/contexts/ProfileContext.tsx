import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { Profile, IProfile } from '../models/ProfileModel';
import { profileStore } from '../stores/ProfileStore';

interface ProfileContextType {
    profile: Profile | null;
    isLoading: boolean;
    error: string | null;
    fetchProfile: (profileId: string) => Promise<void>;
    updateProfile: (profileId: string, data: Partial<IProfile>) => Promise<Profile | null>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<Profile | null>(profileStore.profile);
    const [isLoading, setIsLoading] = useState(profileStore.isLoading);
    const [error, setError] = useState<string | null>(profileStore.error);

    // Subscribe to store changes with optimized updates
    useEffect(() => {
        const checkForUpdates = () => {
            setProfile(prevProfile => {
                if (prevProfile?.id !== profileStore.profile?.id) {
                    return profileStore.profile;
                }
                return prevProfile;
            });
            
            setIsLoading(profileStore.isLoading);
            setError(profileStore.error);
        };

        checkForUpdates();
        const unsubscribe = profileStore.subscribe(checkForUpdates);
        return () => unsubscribe();
    }, []);

    const fetchProfile = async (profileId: string) => {
        await profileStore.fetchProfile(profileId);
    };

    const updateProfile = async (profileId: string, data: Partial<IProfile>) => {
        return await profileStore.updateProfile(profileId, data);
    };

    return (
        <ProfileContext.Provider
            value={{
                profile,
                isLoading,
                error,
                fetchProfile,
                updateProfile,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = (): ProfileContextType => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
