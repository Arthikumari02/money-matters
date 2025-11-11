import React from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import * as styles from './Styles';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation('modal');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      overlayClassName={styles.ModalOverlay}
      className={styles.ConfirmModalBox}
      contentLabel={title}
      shouldCloseOnOverlayClick={true}
    >
      <button onClick={onCancel} className={styles.ModalCloseButton}>
        <IoClose size={22} />
      </button>

      <div className={styles.ModalContentWrapper}>
        <div className={styles.ConfirmIconWrapper}>
          <FiLogOut size={26} />
        </div>

        <div className="flex-1">
          <h2 className={styles.ConfirmTitle}>{title}</h2>
          <p className={styles.ConfirmMessage}>{message}</p>
        </div>
      </div>

      <div className={styles.ConfirmButtonWrapper}>
        <button onClick={onConfirm} className={styles.ConfirmYesButton}>
          {t('delete.yes_delete') || 'Yes, Logout'}
        </button>
        <button onClick={onCancel} className={styles.ConfirmCancelButton}>
          {t('delete.no_leave_it') || 'Cancel'}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
