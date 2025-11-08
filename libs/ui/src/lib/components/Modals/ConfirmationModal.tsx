import React from 'react';
import { IoClose } from 'react-icons/io5';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import * as styles from './Styles';

interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation('modal');

  return (
    <div className={styles.ModalOverlay}>
      <div className={styles.ConfirmModalBox}>
        <button onClick={onCancel} className={styles.ModalCloseButton}>
          <IoClose size={20} />
        </button>

        <div className="flex items-start gap-4">
          <div className={styles.ConfirmIconWrapper}>
            <FaExclamationTriangle size={20} />
          </div>

          <div className="flex-1">
            <h2 className={styles.ConfirmTitle}> {title} ?</h2>
            <p className={styles.ConfirmMessage}>{message}</p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            variant="delete"
            onClick={onConfirm}
            className="flex-1 justify-center"
          >
            {t('delete.yes_delete')}
          </Button>
          <Button
            variant="leave"
            onClick={onCancel}
            className="flex-1 justify-center"
          >
            {t('delete.no_leave_it')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
