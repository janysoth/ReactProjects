import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import AuthLayout from '../../components/layouts/AuthLayout';
import { UserContext } from '../../context/UserContext';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import { validateEmail } from '../../utils/helper';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Load remembered email if exists
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        // Save token based on rememberMe
        if (rememberMe) {
          localStorage.setItem('token', token);
          localStorage.setItem('rememberedEmail', email);
        } else {
          sessionStorage.setItem('token', token);
          localStorage.removeItem('rememberedEmail');
        }

        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.message && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>

        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label='Email Address'
            type='text'
            placeholder='johnsmith@gmail.com'
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            type='password'
            placeholder='Min 8 characters'
          />

          <div className='flex items-center gap-2 mt-2 mb-4'>
            <input
              id='rememberMe'
              type='checkbox'
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className='w-4 h-4'
            />
            <label htmlFor='rememberMe' className='text-sm text-slate-800'>
              Remember Me
            </label>
          </div>

          <div className='flex justify-end mb-4'>
            <Link
              to='/forgot-password'
              className='text-sm text-primary underline hover:opacity-80'
            >
              Forgot Password?
            </Link>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button
            type='submit'
            className={`btn-primary cursor-pointer ${!email || !password ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={!email || !password}
          >
            Login
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{' '}
            <Link
              className='font-medium text-primary underline cursor-pointer'
              to='/signup'
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;