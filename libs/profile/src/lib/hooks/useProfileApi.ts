import { IProfile } from '../models/ProfileModel';

export const useProfileApi = () => {
  const getProfile = async (userId: string): Promise<IProfile> => {
    const response = await fetch(
      'https://bursting-gelding-24.hasura.app/api/rest/profile',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret':
            'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
          'x-hasura-role': 'user',
          'x-hasura-user-id': userId,
        },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch profile');

    const data = await response.json();
    console.log('API Response:', data);

    const users = data.users || [];
    const profile = Array.isArray(users) ? users[0] : null;

    if (!profile) {
      console.error('No profile data found in response:', data);
      throw new Error('Profile data is empty');
    }

    console.log('Profile data:', JSON.stringify(profile, null, 2));

    return {
      id: profile.id,
      userId: profile.user_id || profile.id,
      name:
        profile.name ||
        `${profile.first_name || ''} ${profile.last_name || ''}`.trim() ||
        'Unknown User',
      userName:
        profile.username ||
        profile.userName ||
        profile.email?.split('@')[0] ||
        'user',
      email: profile.email || '',
      presentAddress: profile.present_address || profile.presentAddress,
      permanentAddress: profile.permanent_address || profile.permanentAddress,
      city: profile.city,
      country: profile.country,
      postalCode: profile.postal_code || profile.postalCode,
      avatarUrl: profile.avatar_url || profile.avatarUrl,
      dateOfBirth: profile.date_of_birth || profile.dateOfBirth,
      createdAt: profile.created_at || new Date().toISOString(),
      updatedAt: profile.updated_at || new Date().toISOString(),
    };
  };

  return { getProfile };
};
