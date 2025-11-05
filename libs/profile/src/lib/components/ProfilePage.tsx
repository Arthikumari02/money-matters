import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@money-matters/auth';
import { PageLoader } from '@money-matters/ui';
import { useProfileStore } from '../contexts/ProfileContext';
import { useTranslation } from 'react-i18next';
import { ProfileHeader } from './ProfileHeader';
import { ProfileForm } from './ProfileForm';
import * as styles from './Styles';

export const ProfilePage: React.FC = observer(() => {
  const profileStore = useProfileStore();
  const authStore = useAuthStore();
  const { t } = useTranslation('profile');

  useEffect(() => {
    console.log('ProfilePage: useEffect triggered');
    console.log('Auth store userInfo:', authStore?.userInfo);

    if (authStore?.userInfo?.id) {
      console.log('Fetching profile for user ID:', authStore.userInfo.id);
      profileStore.fetchProfile(authStore.userInfo.id)
        .then(() => {
          console.log('Profile fetch completed');
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
        });
    } else {
      console.log('No user ID available in authStore.userInfo');
    }
  }, [authStore.userInfo?.id, profileStore]);

  const { profile, isLoading, error } = profileStore;

  if (isLoading) return <PageLoader />;
  if (error)
    return <div className="text-center mt-20 text-red-500 font-medium">{error}</div>;

  return (
    <div className={styles.PageContainer}>
      <ProfileHeader title={t('profile')} />

      <div className={styles.ProfileCard}>
        <div className={styles.ProfileLayout}>
          <div className={styles.ProfileImageWrapper}>
            {profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt="Profile"
                className={styles.ProfileImage}
              />
            ) : (
              <div className={styles.InitialAvatar}>
                {profile?.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}

          </div>

          <div className={styles.ProfileFormWrapper}>
            <ProfileForm profile={profile} t={t} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfilePage;
