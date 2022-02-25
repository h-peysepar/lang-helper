import * as React from 'react';
import AuthForm from '../../components/AuthForm';

interface SignUpProps {
}

const SignUp = (props: SignUpProps) => {
  return <AuthForm  mode='sign-up'/>;
};

export default SignUp;
