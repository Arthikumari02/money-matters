import React from 'react';
import { IoClose } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import Button from '../Button/Button';
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
          <h2 className={styles.ConfirmTitle}> {t(title === 'delete' ? 'delete.title' : 'logout.title')}{title}</h2>
          <p className={styles.ConfirmMessage}>{message}</p>
        </div>
      </div>

      <div className={styles.ConfirmButtonWrapper}>
        <Button
          onClick={onConfirm}
          variant="danger"
          className="w-full sm:w-auto"
        >
          {t(title === 'delete' ? 'delete.yes_delete' : 'logout.yes_logout')}
        </Button>
        <Button
          onClick={onCancel}
          variant="secondary"
          className="w-full sm:w-auto"
        >
          {t('delete.no_leave_it')}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
