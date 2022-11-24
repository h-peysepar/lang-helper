// import { model, Schema, models } from 'mongoose';
// export interface Setting {
//   quiz_per_day: number;
//   countof_correct_answers_to_pass_word: number;
//   time_to_remind: {
//     hour: number;
//     minute: number;
//   };
// }
// export interface UserInterface {
//   username: string;
//   password: string;
//   setting: Setting;
// }
// const userSchema = new Schema({
//   username: String,
//   password: String,
//   setting: {
//     type: {
//       quiz_per_day: { type: Number, default: 1 },
//       countof_correct_answers_to_pass_word: { type: Number, default: 10 },
//       time_to_remind: {
//         hour: { type: Number, default: 9 },
//         minute: { type: Number, default: 0 },
//       },
//     },
//     default: {},
//   },
// });

import { ID } from '../utils/helpers';
import { connectDb } from '../utils/withDb';

// const User = models.users || model<UserInterface>('users', userSchema);

export interface UserType {
  username: string;
  password: string;
  quiz_per_day: number;
  correct_answers_capacity: number;
  id: string;
}

class User implements UserType {
  constructor(
    public username: string,
    public password: string,
    public quiz_per_day: number = 1,
    public correct_answers_capacity: number = 12,
    public id: string = ID('users')
  ) {}
  static async updateSetting({
    user_id,
    quiz_per_day,
    correct_answers_capacity,
    onError,
  }: {
    user_id: string;
    quiz_per_day: number;
    correct_answers_capacity: number;
    onError?: Function;
  }) {
    const db = await connectDb();
    const target = db.data?.users.find(user => user.id === user_id);
    if (!target) {
      return onError?.();
    }
    target.quiz_per_day = quiz_per_day;
    target.correct_answers_capacity = correct_answers_capacity;
    await db.write();
  }
}
export default User;
