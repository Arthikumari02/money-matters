import React from 'react';
import { useTranslation } from 'react-i18next';
import * as styles from './Styles';

interface TotalCreditsAndDebitsProp {
  amount: string;
  isCredit: boolean;
  imagePath: string;
}

const TotalCreditsAndDebits: React.FC<TotalCreditsAndDebitsProp> = ({
  amount,
  isCredit,
  imagePath,
}) => {
  const { t } = useTranslation('dashboard');
  return (
    <div className={styles.CreditDebitCard}>
      <div>
        <h1 className={isCredit ? styles.CreditAmount : styles.DebitAmount}>
          ${amount}
        </h1>
        <p className={styles.AmountLabel}>
          {isCredit ? t('credit') : t('debit')}
        </p>
      </div>
      <img src={imagePath} alt="transaction visual" className={styles.AmountImage} />
    </div>
  );
};

export default TotalCreditsAndDebits;
