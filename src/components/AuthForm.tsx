import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from './errorMessage';
import Label from './Label';

function AuthForm(props: {
  mode: 'sign-in' | 'sign-up';
}) {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  const isSignUp = props.mode === 'sign-up';
  const onSubmit = handleSubmit((data: any) => {
    const { confirm_password, ...values } = data;
    if (props.mode) {
      //  props.signup(data, () => setIsSignUp(false))
    } else {
      //  props.login(values, () => router.push('/quiz'))
    }
  });
  const validations = {
    username: {
      required: 'this field is required',
      minLength: {
        value: 4,
        message: 'username must have at least 4 characters',
      },
    },
    password: {
      required: 'this field is required',
      minLength: {
        value: 3,
        message: 'password must have at least 6 characters',
      },
      validate: (pass: string) =>
        !isSignUp
          ? true
          : pass.split('').some(item => +item) ||
            'password must have at least one numeric character',
    },
    confirm_password: {
      validate: (val: string) =>
        !isSignUp
          ? true
          : getValues('password') === val || "doesn't match password",
    },
  };
  return (
    <form
      onSubmit={onSubmit}
      className="absolute left-0 top-0 z-10 w-full h-full bg flex items-center"
    >
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="welcome text-blue-400">Welcome!</h1>
        <div className="text-red-600 h-5 my-2">{/**props.errorMessage */}</div>
        <div className="flex flex-col gap-1 justify-center items-center w-10/12">
          <div className="w-full mb-2">
            <Label>username</Label>
            <input
              {...register('username', validations.username)}
              className="general-input"
            />
            <ErrorMessage>{errors.username?.message}</ErrorMessage>
          </div>
          <div className="w-full mb-2">
            <Label>password</Label>
            <input
              {...register('password', validations.password)}
              className="general-input"
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>
          <div
            className={`w-full mb-2 transition-all relative ${
              !isSignUp ? 'opacity-0' : ''
            }`}
          >
            {!isSignUp && <div className="absolute w-full h-full z-10"></div>}
            <Label>confirm password</Label>
            <input
              {...register('confirm_password', validations.confirm_password)}
              className="general-input"
            />
            <ErrorMessage>{errors.confirm_password?.message}</ErrorMessage>
          </div>
          <a
            className="text-white underline"
            onClick={() => router.push(isSignUp ? '/sign-in' : '/sign-up')}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </a>
          <button className="button">Submit</button>
        </div>
      </div>
    </form>
  );
}

export default AuthForm;