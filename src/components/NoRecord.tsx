import React from 'react';
import Styled from './Styled';

interface Props {}
const Div = Styled('div')`
  text-center
  text-xl
  font-bold
  mt-10
  text-gray-50
  opacity-80
`;
function NoRecord(props: Props) {
  const {} = props;

  return <Div>No Record Found</Div>;
}

export default NoRecord;
