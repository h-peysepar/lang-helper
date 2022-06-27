import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Clear from '@mui/icons-material/Clear';
import Done from '@mui/icons-material/Done';
import RotatableCard from '../../components/RotatableCard';
import { IncomingWord } from '../../constants/interfaces';
import { useMutation, useQuery } from 'react-query';
import { fetcher } from '../../utils/helpers';
import { queryClient } from '../_app';
import { axios } from '../../utils/api';

export interface QuizProps {}

export default function Quiz(props: QuizProps) {
  const { mutate } = useMutation(({payload, state}) => axios.patch(`/quiz/answer?answer=${state}` , payload));
  const ActionComponent = ({ id }: { id: string }) => {
    const setWordAnswer = (state: boolean) => () => {
      const payload = {
        quiz_id: data?._id,
        word_id: id,
      };
      console.log('hrere')
       mutate({payload, state})
    };
    return (
      <>
        <IconButton onClick={setWordAnswer('false')}>
          <Clear />
        </IconButton>
        <IconButton onClick={setWordAnswer('true')}>
          <Done />
        </IconButton>
      </>
    );
  };
  let { data } = useQuery(
    'QUIZ',
    fetcher('quiz', { params: { date: new Date().toISOString().slice(0, 10) } })
  );
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
