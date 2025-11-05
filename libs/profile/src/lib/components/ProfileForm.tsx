import React from 'react';
import { Profile } from '../types';
import { ProfileField } from './ProfileField';
import * as styles from './Styles';

interface ProfileFormProps {
  profile: Profile | null;
  t: (key: string) => string;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ profile, t }) => {
  if (!profile) return null;

  return (
    <div className={styles.ProfileFormGrid}>
      <ProfileField label={t('your_name')} value={profile.name} />
      <ProfileField label={t('user_name')} value={profile.userName} />
      <ProfileField label={t('email')} value={profile.email} />
      <ProfileField label={t('password')} value="*********" />
      <ProfileField
        label={t('date_of_birth')}
        value={profile.dateOfBirth?.toLocaleDateString()}
      />
      <ProfileField label={t('present_address')} value={profile.presentAddress} />
      <ProfileField label={t('permanent_address')} value={profile.permanentAddress} />
      <ProfileField label={t('city')} value={profile.city} />
      <ProfileField label={t('postal_code')} value={profile.postalCode} />
      <ProfileField label={t('country')} value={profile.country} />
    </div>
  );
};
