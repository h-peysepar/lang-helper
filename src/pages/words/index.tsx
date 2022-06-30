import * as React from 'react';
// import IconButton from '@mui/material/IconButton';
// import DeleteOutline from '@mui/icons-material/DeleteOutline';
import RotatableCard from '../../components/RotatableCard';
import { IncomingWord } from '../../constants/interfaces';
import { useQuery } from 'react-query';
import { axios } from '../../utils/api';
import Styled from '../../components/Styled';
import Loading from '../../components/Loading';
import NoRecord from '../../components/NoRecord';

const fetcher = (): Promise<IncomingWord[]> =>
  new Promise((res, rej) =>
    axios.get('/words').then(({ data: { data } }) => res(data))
  );
export interface WordsProps {}

function Words(props: WordsProps) {
  const ActionComponent = (actionProps: {
    rightAnswers: number;
    wrongAnsweres: number;
    id: string;
  }) => {
    // const deleteItem = () => {
    //   props.deleteWord(actionProps.id)
    // };

    return (
      <>
        {/* <IconButton>
          <DeleteOutline />
        </IconButton> */}
        <Statistics className='text-red-600'>
          {actionProps.wrongAnsweres}
        </Statistics>
        <Statistics className='text-green-600'>
          {actionProps.rightAnswers}
        </Statistics>
      </>
    );
  };
  const { isLoading, error, data } = useQuery('WORDS_LIST', fetcher, {
    refetchOnWindowFocus: false,
  });
  if(isLoading){
    return <Loading />
  if (isLoading) {
    return <Loading />;
  }
  if(!data?.length){
    return <NoRecord />
  }
  return (
    <div className=''>
      {
        data?.map(item => (
          <RotatableCard
            key={item._id}
            word={item.word}
            definition={item.definition}
            ActionComponent={() => (
              <ActionComponent
                rightAnswers={item.countOfRightAnswers}
                wrongAnsweres={item.countOfWrongAnswers}
                id={item._id}
              />
            )}
          />
        ))
      }
    </div>
  );
}
Words.private = true;
export default Words;
const Statistics = Styled('div')`
  mx-3
  w-5
  text-center
`;
