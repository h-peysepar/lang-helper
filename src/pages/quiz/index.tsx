'use strict';
import * as React from 'react';
// import { IncomingWord } from '../../constants/interfaces';
import { useMutation, useQuery } from 'react-query';
import { EnNumber, fetcher } from '../../utils/helpers';
import { axios } from '../../utils/api';
import Button from '../../components/Button';
import Styled from '../../components/Styled';
import { useRouter } from 'next/router';
import PieChart from '../../components/PieChart';
import Loading from '../../components/Loading';
export interface QuizProps {}
export default function QuizList(props: QuizProps) {
  const {
    data: quizList,
    refetch,
    isLoading: listLoading,
  } = useQuery('QUIZES_LIST', fetcher('/quiz', {}));
  const { mutate, isLoading } = useMutation(() =>
    axios.post('/quiz', { date: new Date().toISOString().slice(0, 10) })
  );
  const router = useRouter();
  return (
    <div className='relative'>
      <Button
        isLoading={isLoading}
        onClick={() => mutate(null, { onSuccess: refetch })}
      >
        Generate Quiz
      </Button>
      {listLoading ? (
        <Loading staticc/>
      ) : (
        quizList?.map(quiz => (
          <Card onClick={() => router.push(`/quiz/${quiz._id}`)}>
            <span>
              {EnNumber(
                new Date(quiz?.date).toLocaleDateString('fa-ir').slice(0, 10)
              )}
            </span>
            {console.log(quiz.statistics)}
            {quiz.is_done && <PieChart data={quiz.statistics} id={quiz._id} />}
          </Card>
        ))
      )}
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
