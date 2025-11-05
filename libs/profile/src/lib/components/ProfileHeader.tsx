import React from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@money-matters/auth';
import { useTranslation } from 'react-i18next';
import { AddTransactionButton, LanguageSelector } from '@money-matters/ui';
import * as styles from './Styles';

interface ProfileHeaderProps {
  title: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = observer(({ title }) => {
  const authStore = useAuthStore();
  const { t } = useTranslation('profile');

  return (
    <div className={styles.HeaderContainer}>
      <h1 className={styles.HeaderTitle}>{title}</h1>
      <div className={styles.HeaderActionContainer}>
        <LanguageSelector />
        <AddTransactionButton
          userId={authStore.userInfo?.id ?? ''}
        />
      </div>
    </div>
  );
});
