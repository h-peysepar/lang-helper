import * as React from 'react';
import IconButton from "@material-ui/core/IconButton";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import RotatableCard from "../../components/RotatableCard";
import { IncomingWord } from "../../constants/interfaces";

export interface WordsProps {
}

export default function Words (props: WordsProps) {


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
              <span className="mx-3">{actionProps.wrongAnsweres}</span>
              <span className="mx-3">{actionProps.rightAnswers}</span>
            </>
          );
        };     
     
     
  return (
     <div className="">
     {[].map((item: IncomingWord) => (
       <RotatableCard
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
