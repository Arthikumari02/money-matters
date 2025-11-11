import React, { useState } from 'react';
import { useAuthStore } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as styles from './Styles';

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authStore = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const success = await authStore.login(email, password);
      if (success) {
        if (authStore.isAdmin) {
          navigate('/dashboard');
        } else {
          navigate(`/dashboard`);
        }
      } else {
        setError(authStore.error || 'Invalid email or password');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
    setIsLoading(false);
  };

  const renderHeader = () => <h2 className={styles.Heading}>Login</h2>
  const renderForm = () => <form onSubmit={handleSubmit} className={styles.Form}>
    <div>
      <label className={styles.Label}>Email:</label>
      <input
        type="email"
        className={styles.Input}
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    <div>
      <label className={styles.Label} htmlFor="password">Password:</label>
      <input
        type={showPassword ? 'text' : 'password'}
        className={styles.Input}
        placeholder="Enter password"
        value={password}
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className={styles.CheckboxContainer}>
        <input
          id="showPassword"
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          className={styles.Checkbox}
        />
        <label htmlFor="showPassword" className={styles.CheckboxLabel}>
          Show Password
        </label>
      </div>
    </div>

    <button type="submit" className={styles.Button} disabled={isLoading}>
      {isLoading ? 'Signing in...' : 'SIGN IN'}
    </button>
  </form>

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        {renderHeader()}

        {error && <div className={styles.ErrorBox}>{error}</div>}

        {renderForm()}
      </div>
    </div>
  );
};

export default LoginForm;
