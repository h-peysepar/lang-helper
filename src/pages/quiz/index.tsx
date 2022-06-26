import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Clear from '@mui/icons-material/Clear';
import Done from '@mui/icons-material/Done';
import RotatableCard from '../../components/RotatableCard';
import { IncomingWord } from '../../constants/interfaces';
import { useQuery } from 'react-query';
import { fetcher } from '../../utils/helpers';

export interface QuizProps {}

export default function Quiz(props: QuizProps) {
  const ActionComponent = ({ id }: { id: string }) => {
    // const setWordAnswer = (state: boolean) => () => {
    //      const payload = {
    //           quiz_id: props.quiz_id,
    //           word_id: id,
    //      }
    //      props.setAnswer(payload, state)
    // }
    return (
      <>
        <IconButton onClick={() => {}}>
          <Clear />
        </IconButton>
        <IconButton onClick={() => {}}>
          <Done />
        </IconButton>
      </>
    );
  };
  const { data } = useQuery(
    'QUIZ',
    fetcher('quiz', { params: { date: new Date().toISOString().slice(0, 10) } })
  );
  console.log(data);
  return (
    <div className='max-h-full overflow-y-auto'>
      {data?.words?.map((word: IncomingWord) => (
        <RotatableCard
          key={word._id}
          ActionComponent={() => <ActionComponent id={word._id} />}
          word={word.word}
          definition={word.definition}
        />
      ))}
    </div>
  );
}
Quiz.private = true;
