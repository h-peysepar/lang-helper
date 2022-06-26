import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import React from 'react';
import Loading from './Loading';
import Styled from './Styled';

interface Props {
  children: ReactJSXElement | string;
  isLoading: boolean;
}

function Button({ children, ...props }: Props) {
  return (
    <Btn {...props} className={'relative' + ' ' + props.className}>
      {props.isLoading ? <Loading /> : children}
    </Btn>
  );
}

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
