import withDb from '../../../utils/withDb';
import { NextApiRequest, NextApiResponse } from 'next';
import Word from '../../../models/word';
import handler from 'next-connect';
import { getDefinition } from '../../../utils/helpers';
import Quiz from '../../../models/quiz';
import User from '../../../models/user';
// const Word = {};
const router = handler<NextApiRequest, NextApiResponse>();
router
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { user_id } = req.cookies;
    const { max } = await getSetting(user_id);
    const {date} = req.body
    res.json(await generateQuiz({ user_id, max, date }));
  })
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { user_id } = req.cookies;

    try {
      const quizes = await Quiz.find({ user_id });
      res.json({ data: quizes });
      // Quiz.find({ user_id }).populate('words.word', 'word definition');
    } catch (error) {
      console.log(error);
    }
  });
// .get(async (req: NextApiRequest, res: NextApiResponse) => {
//   const { user_id } = req.cookies;
//   try {
//     let [{ setting = null }, quiz] = await Promise.all([
//       User.findById(user_id),
//       Quiz.find({ user_id, date: req.query.date }).populate(
//         'words.word',
//         'word definition'
//       ),
//     ]);
//     const {
//       quiz_per_day,
//       countof_correct_answers_to_pass_word: maxTrueAnswers,
//     } = setting;
//     const today = new Date(req.query.date).toISOString().slice(0, 10);
//     const runningQuiz = quiz.find(item => !item.is_done)?._doc;
//     if (quiz.length === quiz_per_day && !runningQuiz) {
//       res.json({ message: "You're finished your quizes today!" });
//     }
//     if (!runningQuiz) {
//       //generate quiz
//       const quizWords = await Word.find(
//         {
//           user_id,
//           countOfRightAnswers: { $lte: maxTrueAnswers },
//         },
//         'word definition'
//       ).sort('-countOfWrongAnswers createdDate');
//       if (!quizWords.length) {
//         return res.json({ message: 'You Have No Word To Make A Quiz!' });
//       }
//       let newQuiz = new Quiz({
//         user_id,
//         date: today,
//         words: quizWords.map(word => ({
//           word: word._id,
//         })),
//       });
//       newQuiz = await newQuiz.save();

//       res.json({
//         data: { ...newQuiz._doc, words: quizWords.map(word => word._doc) },
//       });
//     } else {
//       runningQuiz.words = runningQuiz.words.filter(
//         ({ is_answered }) => !is_answered
//       );
//       runningQuiz.words = runningQuiz.words.map(({ _doc }) => _doc.word._doc);
//       res.send({ data: runningQuiz });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// })
export default withDb(router);
const generateQuiz = async ({
  user_id,
  max,
  date,
}: {
  user_id: string;
  max: number;
  date: string;
}) => {
  try {
    const quizWords = await Word.find(
      {
        user_id,
        countOfRightAnswers: { $lte: max },
      },
      'word definition'
    ).sort('-countOfWrongAnswers createdDate');
    let newQuiz = new Quiz({
      user_id,
      date,
      words: quizWords.map(word => ({
        word: word._id,
      })),
    });
    return await newQuiz.save();
  } catch (error) {}
};
const getSetting = async (user_id: string) => {
  try {
    const { setting } = await User.findById(user_id);
    const { quiz_per_day, countof_correct_answers_to_pass_word: max } =
      setting || {};
    return {
      quiz_per_day,
      max,
    };
  } catch (error) {}
};
