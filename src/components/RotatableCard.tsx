import { useState } from 'react';
import Styled from './Styled';

function RotatableCard(props: {
  className?: string;
  word: string;
  definition?: string;
  ActionComponent: Function;
}) {
  const [state, setState] = useState(false);
  const rotateCard = () => setState(prev => !prev);
  return (
    <div className={`${props.className} flex px-4 h-14 my-2`}>
      <CardSection
        onClick={rotateCard}
        className={`flip-container flex-1 rounded-l-2xl ${
          state ? 'rotated' : ''
        }`}
      >
        <CardLayer className='front'>{props.word}</CardLayer>
        <CardLayer className='back'>{props.definition}</CardLayer>
      </CardSection>
      <CardSection className='inline-flex items-center rounded-r-2xl pr-5'>
        <props.ActionComponent />
      </CardSection>
    </div>
  );
}

export default RotatableCard;
export const CardSection = Styled('div')`
     h-full
     bg-gray-50
     h-full
     bg-opacity-60
`;
const CardLayer = Styled('div')`
    cursor-pointer    
    absolute
    h-full
    w-full
    flex
    items-center
    left-5
`;
