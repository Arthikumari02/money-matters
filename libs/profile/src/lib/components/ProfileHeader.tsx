import React from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@money-matters/auth';
import { useTranslation } from 'react-i18next';
import { AddTransactionButton, LanguageSelector } from '@money-matters/ui';

interface ProfileHeaderProps {
  title: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = observer(({ title }) => {
  const authStore = useAuthStore();
  const { t } = useTranslation('profile');

  return (
    <div className="flex justify-between items-center mb-9 bg-white p-5">
      <h1 className="text-2xl font-semibold text-[#343C6A]">{title}</h1>
      <div className="flex items-center space-x-2">
        <LanguageSelector />
        <AddTransactionButton
          userId={authStore.userInfo?.id ?? ''}
          className="!rounded-lg !px-4 !py-1 text-sm font-semibold bg-blue-600 hover:bg-blue-700 transition-all"
        />
      </div>
    </div>
  );
});
