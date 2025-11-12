import { useState } from 'react';
import { useAuthStore } from '@money-matters/auth';
import { useNavigate } from 'react-router-dom';
import { LogoutIcon } from './Icons';
import { ConfirmationModal } from '@money-matters/ui';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as styles from './Styles';

const LogoutButton = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation('modal');

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      authStore.logout();
      toast.success('Logout successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Failed to logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
      setIsModalOpen(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleConfirmLogout = () => {
    handleLogout();
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        disabled={isLoggingOut}
        className={styles.LogoutButton}
        aria-label="Logout"
      >
        <LogoutIcon className={styles.LogoutIcon} />
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        title={t('logout.Type')}
        message={t('logout.description')}
        onConfirm={handleConfirmLogout}
        onCancel={closeModal}
      />
    </>
  );
};

export default LogoutButton;
