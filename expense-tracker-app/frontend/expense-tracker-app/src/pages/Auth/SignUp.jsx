import React from 'react';
import SignUpForm from '../../components/Forms/SignupForm';
import AuthLayout from '../../components/layouts/AuthLayout';
import SignupHeader from '../../components/ui/SignupHeader';

const SignUp = () => {
  return (
    <AuthLayout>
      <div className="lg:w-full mt-10 md:mt-0 flex flex-col justify-center">
        <SignupHeader />
        <SignUpForm />
      </div>
    </AuthLayout>
  );
};

export default SignUp;