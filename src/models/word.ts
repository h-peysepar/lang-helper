// import mongoose, { model, Schema, Types } from 'mongoose';

import { getDefinition } from '../utils/helpers';

// const wordSchema = new Schema({
//      word: String,
//      definition: String,
//      countOfRightAnswers: {type: Number, default: 0},
//      countOfWrongAnswers: {type: Number, default: 0},
//      createdDate: {type: Number, default: Date.now()},
//      user_id: Types.ObjectId,
// })
// const Word = mongoose.models.words || model('words', wordSchema);
export interface WordType {
  word: string;
  definition: string | undefined;
  countOfRightAnswers: number;
  countOfWrongAnswers: number;
  createdDate: number;
  user_id: string;
}

class Word implements WordType {
  constructor(
    public word: string,
    public user_id: string,
    public definition: string | undefined,
    public countOfRightAnswers: number = 0,
    public countOfWrongAnswers: number = 0,
    public createdDate: number = Date.now()
  ) {}
  private async getDefinition() {
    this.definition = await getDefinition(this.word);
  }
  public async gen() {
    if (!this.definition) {
      await this.getDefinition();
    }
    return this;
  }
}
export default Word;
