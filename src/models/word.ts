import mongoose, { model, Schema, Types } from 'mongoose';

const wordSchema = new Schema({
     word: String,
     definition: String,
     countOfRightAnswers: {type: Number, default: 0},
     countOfWrongAnswers: {type: Number, default: 0},
     createdDate: {type: Number, default: Date.now()},
     updated_date: {type: String, default: `${new Date().toISOString().slice(0,10)}`},
     daily_updates: {type: Number, default: 0},
     user_id: Types.ObjectId,
})
const Word = mongoose.models.words || model('words', wordSchema);
export default Word;