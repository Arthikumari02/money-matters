import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@money-matters/auth';
import {
  AddTransactionButton,
  LanguageSelector,
  PageLoader,
} from '@money-matters/ui';
import { useProfileStore } from '../contexts/ProfileContext';
import { useTranslation } from 'react-i18next';

const ProfilePage: React.FC = observer(() => {
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
    <div className="min-h-screen bg-[#F8FAFC] ">
      <div className="flex justify-between items-center mb-9 bg-white p-5">
        <h1 className="text-2xl font-bold text-gray-800">{t('profile')}</h1>
        <div className="flex items-center space-x-2">
          <LanguageSelector />
          <AddTransactionButton userId={authStore.userInfo?.id ?? ''} />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-2xl max-w-4xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <img
            src={
              profile?.avatarUrl ||
              `https://ui-avatars.com/api/?name=${profile?.name}+${profile?.userName}`
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {t('your_name')}
              </label>
              <input
                type="text"
                value={profile?.name || ''}
                disabled
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {t('user_name')}
              </label>
              <input
                type="text"
                value={profile?.userName || ''}
                disabled
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {t('email')}
              </label>
              <input
                type="text"
                value={profile?.email || ''}
                disabled
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {t('password')}
              </label>
              <input
                type="text"
                value="*********"
                disabled
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {t('date_of_birth')}
              </label>
              <input
                type="text"
                value={profile?.dateOfBirth?.toLocaleDateString() || ''}
                disabled
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {t('present_address')}
              </label>
              <input
                type="text"
                value={profile?.presentAddress || ''}
                disabled
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {t('permanent_address')}
              </label>
              <input
                type="text"
                value={profile?.permanentAddress || ''}
                disabled
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {t('city')}
              </label>
              <input
                type="text"
                value={profile?.city || ''}
                disabled
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {t('postal_code')}
              </label>
              <input
                type="text"
                value={profile?.postalCode || ''}
                disabled
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {t('country')}
              </label>
              <input
                type="text"
                value={profile?.country || ''}
                disabled
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfilePage;
