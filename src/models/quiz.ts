import mongoose from 'mongoose';
import { model, Schema, Types } from 'mongoose';

const quizSchema = new Schema({
  user_id: { ref: 'user', type: Types.ObjectId },
  date: Date,
  is_done: { type: Boolean, default: false },
  auto_generated: { type: Boolean, default: false },
  words: [
    {
      word: { type: Types.ObjectId, ref: 'words' },
      answer: { type: Boolean, default: null },
    },
  ],
});

const Quiz = mongoose.models.quiz || model('quiz', quizSchema);

export default Quiz;
