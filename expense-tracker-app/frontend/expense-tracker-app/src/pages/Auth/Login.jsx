import React from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import AuthLayout from '../../components/layouts/AuthLayout';

const Login = () => {
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>
        <LoginForm />
      </div>
    </AuthLayout>
  );
};

export default Login;