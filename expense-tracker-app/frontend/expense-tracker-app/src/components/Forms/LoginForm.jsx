import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import { validateEmail } from '../../utils/helper';
import Input from '../Inputs/Input';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const remember = localStorage.getItem('rememberMe') === 'true';

    if (rememberedEmail) setEmail(rememberedEmail);
    if (remember) setRememberMe(true);
  }, []);

  useEffect(() => {
    setError(null);
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return setError('Please enter a valid email address.');
    if (!password) return setError('Please enter your password.');

    try {
      setLoading(true);
      setError(null);

      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });

      const { token, user } = data;
      if (token) {
        localStorage.setItem('token', token);

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberMe');
        }

        updateUser(user);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          type="text"
          placeholder="johnsmith@gmail.com"
        />
      </div>

      <div className="mb-4">
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          placeholder="Min 8 characters"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="accent-primary cursor-pointer"
          />
          Remember Me
        </label>

        <Link to="/forgot-password" className="text-sm text-primary underline hover:opacity-80">
          Forgot Password?
        </Link>
      </div>

      {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

      <button
        type="submit"
        className={`btn-primary w-full cursor-pointer ${(!email || !password || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!email || !password || loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <p className="text-[13px] text-slate-800 mt-3">
        Don’t have an account?{' '}
        <Link className="font-medium text-primary underline" to="/signup">
          Signup
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;