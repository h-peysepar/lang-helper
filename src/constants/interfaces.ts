export interface IncomingWord{
     word: string,
     definition: string,
     _id: string,
     countOfRightAnswers: number,
     countOfWrongAnswers: number,
     createdDate: number,
     user_id: string
}
export interface PostingWord{
     word: string,
     defaultDefinition?: string,
     definition?: string,
     
}

export interface Setting{
     quiz_per_day: number,
     countof_correct_answers_to_pass_word: number,
}

