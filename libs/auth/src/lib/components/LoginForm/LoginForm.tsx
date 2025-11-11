import React, { useState } from 'react';
import { useAuthStore } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as styles from './Styles';
import { validateEmail } from '../../utils/LoginForm/LoginForm';
import { dashboardPath } from '../../Constants/LoginFormConstants';
import { useTranslation } from 'react-i18next';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation('auth');
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(t('login_form.fill_all_fields_error'));
      return;
    }

    if (!validateEmail(email)) {
      setError(t('login_form.invalid_email_error'));
      return;
    }

    setIsLoading(true);
    try {
      const success = await authStore.login(email, password);
      if (success) {
        navigate(dashboardPath);
      } else {
        setError(authStore.error || t('login_form.invalid_password_or_email_error'));
      }
    } catch (err) {
      setError(t('login_form.invalid_password_or_email_error'));
    } finally {
      setIsLoading(false);
    }
  };

  const renderHeader = () => (
    <h2 className={styles.Heading}>
      {t('login_form.title', 'Login')}
    </h2>
  );

  const renderError = () => (
    error && <div className={styles.ErrorBox}>{error}</div>
  );

  const renderEmailField = () => (
    <div>
      <label className={styles.Label} htmlFor="email">
        {t('login_form.email_label', 'Email:')}
      </label>
      <input
        type="email"
        className={styles.Input}
        placeholder={t('login_form.enter_email')}
        value={email}
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        required
      />
    </div>
  );

  const renderPasswordField = () => (
    <div>
      <label className={styles.Label} htmlFor="password">
        {t('login_form.password_label', 'Password:')}
      </label>
      <input
        type={showPassword ? 'text' : 'password'}
        className={styles.Input}
        placeholder={t('login_form.enter_password')}
        value={password}
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        required
      />
    </div>
  );

  const renderPasswordToggle = () => (
    <div className={styles.CheckboxContainer}>
      <input
        id="showPassword"
        type="checkbox"
        checked={showPassword}
        onChange={() => setShowPassword(!showPassword)}
        className={styles.Checkbox}
        disabled={isLoading}
      />
      <label htmlFor="showPassword" className={styles.CheckboxLabel}>
        {t('login_form.show_password')}
      </label>
    </div>
  );

  const renderSubmitButton = () => (
    <button 
      type="submit" 
      className={styles.Button} 
      disabled={isLoading}
    >
      {isLoading ? t('login_form.signing_in') : t('login_form.sign_in')}
    </button>
  );

  const renderForm = () => (
    <form onSubmit={handleSubmit} className={styles.Form}>
      {renderEmailField()}
      {renderPasswordField()}
      {renderPasswordToggle()}
      {renderSubmitButton()}
    </form>
  );

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        {renderHeader()}
        {renderError()}
        {renderForm()}
      </div>
    </div>
  );
};

export default LoginForm;
