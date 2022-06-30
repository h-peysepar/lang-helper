import { Clear, Done } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Loading from '../../components/Loading';
import RotatableCard from '../../components/RotatableCard';
import Styled from '../../components/Styled';
import { axios } from '../../utils/api';
import { fetcher } from '../../utils/helpers';

interface Props {}
interface Word {
  word: {
    word: string;
    definition: string;
    _id: string;
  };
  answer: boolean;
}
interface Response {
  words: Word[];
}
interface TPayload {
  word_id: string;
  answer: boolean;
}
function Quiz(props: Props) {
  const {} = props;
  const {
    query: { id: quizId },
  } = useRouter();
  const { data, isLoading } = useQuery<Response>(
    [quizId, 'QUIZ'],
    fetcher<Response>(`/quiz/${quizId}`, { enabled: !!quizId })
  );

  if (isLoading) {
    return <Loading />;
  }
  const ActionComponent = ({
    id,
    answer: initAnswer,
  }: {
    id: string;
    answer: boolean;
  }) => {
    const [answer, setAnswer] = useState<boolean | null>(initAnswer);
    const { mutate, isLoading: answerLoading } = useMutation<{}, {}, TPayload>(
      payload => axios.patch(`/quiz/${quizId}`, payload)
    );
    const setWordAnswer = (state: boolean) => () => {
      dirtyButton.current = state;
      const payload = {
        word_id: id,
        answer: state,
      };
      mutate(payload, { onSuccess: () => setAnswer(state) });
    };
    const dirtyButton = useRef<boolean>();
    return (
      <>
        <CardAction {...(answer === null && { onClick: setWordAnswer(false) })}>
          {answerLoading && dirtyButton.current === false ? (
            <Loading />
          ) : (
            <Clear className={answer !== false ? '' : 'invisible'} />
          )}
        </CardAction>
        <CardAction {...(answer === null && { onClick: setWordAnswer(true) })}>
          {answerLoading && dirtyButton.current === true ? (
            <Loading />
          ) : (
            <Done className={answer !== true ? '' : 'invisible'} />
          )}
        </CardAction>
      </>
    );
  };
  return (
    <div className='max-h-full overflow-y-auto'>
      {data?.words?.map(({ word, answer }) => (
        <RotatableCard
          key={word._id}
          ActionComponent={() => (
            <ActionComponent id={word._id} {...{ answer }} />
          )}
          word={word.word}
          definition={word.definition}
        />
      ))}
    </div>
  );
}

export default Quiz;
const CardAction = Styled('span')`
  p-1
  block
  w-6
  mx-1
  flex
  justify-center
  cursor-pointer
  relative
`;
