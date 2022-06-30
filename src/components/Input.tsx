import Styled from './Styled';

export const Input = Styled<HTMLInputElement>('input')`
  w-full
  self-stretch
  px-4  
  py-2
  rounded-lg
  bg-transparent
  border
  border-purple-600
  focus:ring-1
  ring-purple-600
  backdrop-blur-sm
  outline-none
  text-center
  bg-blue-200
  bg-opacity-25
`;
