'use strict';
import * as React from 'react';
// import { IncomingWord } from '../../constants/interfaces';
import { useMutation } from 'react-query';
import { EnNumber, fetcher } from '../../utils/helpers';
import { axios } from '../../utils/api';
import Button from '../../components/Button';
import Styled from '../../components/Styled';
import { useRouter } from 'next/router';
import PieChart from '../../components/PieChart';
import Loading from '../../components/Loading';
import NoRecord from '../../components/NoRecord';
import useQuery from '../../hooks/useQuery';
import { QuizType } from '../../models/quiz';
export interface QuizProps {}
interface TQuiz extends QuizType {
  statistics: [number, number];
}
export default function QuizList(props: QuizProps) {
  const {
    data: quizList,
    refetch,
    isLoading: listLoading,
  } = useQuery<TQuiz[]>('QUIZES_LIST', '/quiz');
  const { mutate, isLoading, error } = useMutation<
    {},
    { response: { data: { errorMessage: string } } },
    null
  >(() => axios.post('/quiz', { date: new Date().toISOString().slice(0, 10) }));
  const router = useRouter();
  const renderList = () => {
    if (listLoading) {
      return <Loading staticc />;
    }
    if (!quizList?.length) {
      return <NoRecord />;
    }
    return quizList?.map(quiz => (
      <Card key={quiz.id} onClick={() => router.push(`/quiz/${quiz.id}`)}>
        <span>
          {EnNumber(
            new Date(quiz?.date).toLocaleDateString('fa-ir').slice(0, 10)
          )}
        </span>
        {quiz.is_done ? (
          <PieChart data={quiz.statistics} />
        ) : (
          <span>Incomplete</span>
        )}
      </Card>
    ));
  };
  return (
    <div className='relative'>
      <Button
        isLoading={isLoading}
        onClick={() => mutate(null, { onSuccess: refetch })}
      >
        Generate Quiz
      </Button>
      <div className='text-gray-50 opacity-40 mx-4 my-3'>
        {error?.response?.data?.errorMessage}
      </div>
      {renderList()}
    </div>
  );
}
QuizList.private = true;
const Card = Styled('div')`
  flex
  mx-4
  px-4
  h-14
  my-2
  bg-gray-50
  bg-opacity-60
  items-center
  rounded-2xl
  tracking-wider
  cursor-pointer
  justify-between
`;
