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
  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-medium">{error}</div>
    );

  return (
    <div className="min-h-screen">
      <div className="bg-[#F8FAFC]">
        <ProfileHeader title={t('profile')} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm max-w-4xl mx-auto p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-shrink-0 self-center md:self-start">
            <img
              src={
                profile?.avatarUrl ||
                `https://ui-avatars.com/api/?name=${profile?.name}+${profile?.userName}`
              }
              alt="Profile"
              className="w-24 h-24 rounded-full border border-gray-200 object-cover"
            />
          </div>

          <div className="flex-1 w-full">
            <ProfileForm profile={profile} t={t} />
          </div>
        </div>
      </div>
    </div>
  );
});


export default ProfilePage;
