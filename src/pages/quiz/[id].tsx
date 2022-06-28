import { Clear, Done } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import Loading from '../../components/Loading';
import RotatableCard from '../../components/RotatableCard';
import { axios } from '../../utils/api';
import { fetcher } from '../../utils/helpers';

interface Props {}

function Quiz(props: Props) {
  const {} = props;
  const {
    query: { id: quizId },
  } = useRouter();
  const { data, isLoading } = useQuery(
    [quizId, 'QUIZ'],
    fetcher(`/quiz/${quizId}`, { enabled: !!quizId })
  );

  const { mutate } = useMutation(payload =>
    axios.patch(`/quiz/${quizId}`, payload)
  );

  if (isLoading) {
    return <Loading />;
  }
  const ActionComponent = ({ id }: { id: string }) => {
    const setWordAnswer = (state: boolean) => () => {
      const payload = {
        word_id: id,
        answer: state,
      };
      mutate(payload);
    };
    return (
      <>
        <IconButton onClick={setWordAnswer(false)}>
          <Clear />
        </IconButton>
        <IconButton onClick={setWordAnswer(true)}>
          <Done />
        </IconButton>
      </>
    );
  };
  return (
    <div className='max-h-full overflow-y-auto'>
      {data?.words?.map(({ word }) => (
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

export default Quiz;
