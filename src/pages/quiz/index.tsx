import * as React from 'react';
import IconButton from '@material-ui/core/IconButton'
import Clear from '@material-ui/icons/Clear'
import Done from '@material-ui/icons/Done'
import RotatableCard from '../../components/RotatableCard'
import { IncomingWord } from '../../constants/interfaces';

export interface QuizProps {
}

export default function Quiz (props: QuizProps) {
     const ActionComponent = ({id}: {id: string}) => {
          // const setWordAnswer = (state: boolean) => () => {
          //      const payload = {
          //           quiz_id: props.quiz_id,
          //           word_id: id,
          //      }
          //      props.setAnswer(payload, state)
          // }
          return (
               <>
                    <IconButton onClick={()=>{}}><Clear/></IconButton>
                    <IconButton onClick={()=>{}}><Done/></IconButton>
               </>
          )
     }
  return (
     <div className='max-h-full overflow-y-auto'>
     {
          [].map((word: IncomingWord) => (
               <RotatableCard
                    key={word._id}
                    ActionComponent={()=> <ActionComponent id={word._id}/>}
                    word={word.word}
                    definition={word.definition}
               />
          ))
     }
</div>
  );
}
