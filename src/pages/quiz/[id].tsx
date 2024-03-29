import { Clear, Done } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import Loading from '../../components/Loading';
import RotatableCard from '../../components/RotatableCard';
import Styled from '../../components/Styled';
import useQuery from '../../hooks/useQuery';
import { QuizWord } from '../../models/quiz';
import { axios } from '../../utils/api';
import { fetcher } from '../../utils/helpers';

interface Response {
  words: QuizWord[];
}
interface TPayload {
  word_id: string;
  answer: boolean | null;
}
function Quiz() {
  const {
    query: { id: quizId },
  } = useRouter();
  const { data, isLoading } = useQuery<Response>(
    [quizId, 'QUIZ'],
    `/quiz/${quizId}`,
    { enabled: !!quizId }
  );

  if (isLoading) {
    return <Loading />;
  }
  const ActionComponent = ({
    id,
    answer: initAnswer,
  }: {
    id: string;
    answer: boolean | null;
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
    if (answer !== null) {
      return (
        <span className={`text-${answer ? 'green' : 'red'}-600 block pl-4`}>
          {String(answer)}
        </span>
      );
    }
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
      {data?.words?.map(({ word, definition, answer, id}) => (
        <RotatableCard
          key={word}
          ActionComponent={() => <ActionComponent {...{ answer, id }} />}
          word={word}
          definition={definition}
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
