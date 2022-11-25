import { ID } from '../utils/helpers';
import { WordType } from './word';
export interface QuizWord extends WordType {
  answer: boolean | null;
}
export interface QuizType {
  user_id: string;
  date: string;
  is_done: boolean;
  auto_generated: boolean;
  words: QuizWord[];
  id: string;
}

class Quiz implements QuizType {
  is_done: boolean;
  date: string;
  auto_generated: boolean;
  id: string;
  constructor(public user_id: string, public words: QuizWord[]) {
    this.is_done = false;
    this.date = new Date().toISOString().slice(0, 10);
    this.auto_generated = false;
    this.id = ID('quizes');
  }
}
export default Quiz;
