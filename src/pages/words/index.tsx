import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import RotatableCard from '../../components/RotatableCard';
import { IncomingWord } from '../../constants/interfaces';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { axios } from '../../utils/api';


const fetcher = () =>
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
        <IconButton>
          <DeleteOutline />
        </IconButton>
        <span className='mx-3'>{actionProps.wrongAnsweres}</span>
        <span className='mx-3'>{actionProps.rightAnswers}</span>
      </>
    );
  };
  const { isLoading, error, data } = useQuery('WORDS_LIST', fetcher, {});
  return (
    <div className=''>
      {data?.map((item: IncomingWord) => (
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
      ))}
    </div>
  );
}
Words.private = true;
export default Words;
