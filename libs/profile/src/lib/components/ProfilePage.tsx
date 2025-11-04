import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@money-matters/auth';
import { PageLoader } from '@money-matters/ui';
import { useProfileStore } from '../contexts/ProfileContext';
import { useTranslation } from 'react-i18next';
import { ProfileHeader } from './ProfileHeader';
import { ProfileForm } from './ProfileForm';

export const ProfilePage: React.FC = observer(() => {
  const profileStore = useProfileStore();
  const authStore = useAuthStore();
  const { t } = useTranslation('profile');

  useEffect(() => {
    if (authStore?.userInfo?.id) {
      profileStore.fetchProfile(authStore.userInfo.id);
    }
  }, [authStore.userInfo?.id]);

  const { profile, isLoading, error } = profileStore;

  if (isLoading) return <PageLoader />;

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500 font-medium">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <ProfileHeader title={t('profile')} />

      <div className="bg-white shadow-sm rounded-2xl max-w-4xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-center md:justify-start">
            <img
              src={
                profile?.avatarUrl ||
                `https://ui-avatars.com/api/?name=${profile?.name}+${profile?.userName}`
              }
              alt="Profile"
              className="w-24 h-24 rounded-full border"
            />
          </div>
          <ProfileForm profile={profile} t={t} />
        </div>
      </div>
    </div>
  );
});

export default ProfilePage;
