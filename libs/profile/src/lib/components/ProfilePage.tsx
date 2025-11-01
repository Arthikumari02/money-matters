import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@money-matters/auth';
import { useProfileStore } from '../contexts/ProfileContext';

const ProfilePage: React.FC = observer(() => {
  const profileStore = useProfileStore();
  const authStore = useAuthStore();

  useEffect(() => {
    if (authStore?.userInfo?.id) {
      profileStore.fetchProfile(authStore.userInfo.id);
    }
  }, [authStore.userInfo?.id]);

  const { profile, isLoading, error } = profileStore;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-medium">{error}</div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] ">
      <div className="flex justify-between items-center mb-8 bg-white p-3">
        <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700">
          + Add Transaction
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-2xl p-8 max-w-4xl">
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
                First Name
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
                User Name
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
                Email
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
                Password
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
                Date of Birth
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
                Present Address
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
                Permanet Address
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
                City
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
                Postal Code
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
                Country
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
