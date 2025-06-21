import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import AuthLayout from '../../components/layouts/AuthLayout';
import PasswordRules from '../../components/PasswordRules';
import { UserContext } from '../../context/UserContext';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import { passwordRulesList, validateEmail } from '../../utils/helper';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);
  const fullNameRef = useRef(null);

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const isPasswordValid = passwordRulesList.every(rule => rule.test(password));
  const isFormValid = fullName && validateEmail(email) && isPasswordValid;

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    let profileImageUrl = '';

    try {
      if (profilePic) {
        const { imageUrl } = await uploadImage(profilePic);
        profileImageUrl = imageUrl;
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fullNameRef.current?.focus();
  }, []);

  return (
    <AuthLayout>
      <div className='lg:w-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create An Account</h3>
        <p className='text-xs text-slate-700 mt-1 mb-6'>Join us today by entering details below.</p>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <form onSubmit={handleSignUp}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              label='Full Name'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type='text'
              placeholder='John Smith'
              ref={fullNameRef}
            />
            <Input
              label='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='johnsmith@example.com'
            />
            <div className='col-span-2 mb-2'>
              <Input
                label='Password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!touched) setTouched(true);
                }}
                type='password'
                placeholder='Minimum of 8 Characters...'
              />

              {touched && <PasswordRules password={password} />}
            </div>
          </div>

          {error && <p className='text-red-500 text-xs mt-3'>{error}</p>}

          <button
            type='submit'
            disabled={!isFormValid || submitting}
            className={`btn-primary mt-5 w-full cursor-pointer ${!isFormValid || submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {submitting ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className='text-[13px] text-slate-800 mt-4'>
            Already have an account?{' '}
            <Link to='/login' className='font-medium text-primary underline'>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;