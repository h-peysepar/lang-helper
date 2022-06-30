import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import React, { FC, HTMLAttributes } from 'react';
import Loading from './Loading';
import Styled from './Styled';

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactJSXElement | string;
  isLoading?: boolean;
}

const Button = ({ children, isLoading, ...props }: Props) => {
  return (
    <Btn {...props} className={'relative' + ' ' + props.className}>
      {isLoading ? <Loading /> : children}
    </Btn>
  );
};

export default Button;
const Btn = Styled('button')`
  px-4 
  h-9
  w-full 
  bg-blue-500 
  rounded-lg 
  my-4 
  font-bold
  block
`;
