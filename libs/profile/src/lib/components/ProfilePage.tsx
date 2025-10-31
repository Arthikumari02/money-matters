import React, { useEffect, useState } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { User, Mail, Phone, Calendar, Edit, Key, LogOut } from 'lucide-react';
import { useAuthStore } from '@money-matters/auth';
import { Button } from '@money-matters/ui';
import { useNavigate } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, isLoading, error, fetchProfile, updateProfile } = useProfile();
  const { userInfo, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    if (userInfo?.id) {
      fetchProfile(userInfo.id);
    }
  }, [userInfo]);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phoneNumber: profile.phoneNumber || '',
        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : ''
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      return 'First name and last name are required';
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return 'Please enter a valid email address';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validationError = validateForm();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    if (!profile) {
      setSubmitError('No profile found');
      return;
    }

    try {
      await updateProfile(profile.id, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : null
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to update profile');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>No profile found</div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'User';
  const initials = fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mb-4">
              {initials}
            </div>
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <p className="text-blue-100">{formData.email}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 p-4 border-b">
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            Change Password
          </Button>
          <Button variant="ghost" onClick={handleLogout} className="text-red-600 hover:bg-red-50 flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`block w-full pl-10 pr-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200'} rounded-lg ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter first name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`block w-full pl-10 pr-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200'} rounded-lg ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`block w-full pl-10 pr-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200'} rounded-lg ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`block w-full pl-10 pr-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200'} rounded-lg ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`block w-full pl-10 pr-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200'} rounded-lg ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
            </div>
          </div>

          {submitError && (
            <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
              {submitError}
            </div>
          )}

          {isEditing && (
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
