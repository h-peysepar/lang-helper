import * as React from 'react';
import AuthForm from '../../components/AuthForm';

interface SignInProps {}

const SignIn = (props: SignInProps) => {
  return <AuthForm mode='sign-in' />;
};
SignIn.protected = true;
export default SignIn;
