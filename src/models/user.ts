import { model, Schema, models } from 'mongoose';
export type User = {
     username: string,
     password: string,
     setting: {
          type: {
               quiz_per_day: number,
               countof_correct_answers_to_pass_word: number,
               time_to_remind: {
                    hour: number
                    minute: number
               },
          },
     }
}
const userSchema = new Schema({
     username: String,
     password: String,
     setting: {
          type: {
               quiz_per_day: { type: Number, default: 1 },
               countof_correct_answers_to_pass_word: { type: Number, default: 10 },
               time_to_remind: {
                    hour: { type: Number, default: 9 },
                    minute: { type: Number, default: 0 }
               },
          },
          default: {},
     }
})

const userModel = models.users || model('users', userSchema)

export default userModel
