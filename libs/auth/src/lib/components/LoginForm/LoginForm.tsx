import React, { useState } from 'react';
import { useAuthStore } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#168a6d]">
      <div className="bg-white rounded-xl shadow-lg px-10 py-8 w-full max-w-md">
        <h2 className="text-center font-mono text-3xl font-bold text-gray-800 mb-8">
          Login
        </h2>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-red-700">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              className="border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-700"
              placeholder="Enter email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-700"
              placeholder="Enter password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              required
            />
            <div className="mt-3 flex items-center">
              <input
                id="showPassword"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-gray-700 text-sm">
                Show Password
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#1f876d] hover:bg-[#16ba91] text-white rounded-md text-lg font-medium transition duration-200"
          >
            {isLoading ? 'Signing in...' : 'SIGN IN'}{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
