import { useState } from 'react';
import { Profile, IProfile, UpdateProfileDTO } from '../models/ProfileModel';

const API_BASE_URL = '/api/profile';

export const useProfileApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfile = async (profileId: string): Promise<IProfile | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${profileId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile';
      setError(errorMessage);
      console.error('Error fetching profile:', errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileId: string, data: UpdateProfileDTO): Promise<IProfile | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${profileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      console.error('Error updating profile:', errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getProfile,
    updateProfile,
    isLoading,
    error,
  };
};
