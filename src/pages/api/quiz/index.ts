import withDb from '../../../utils/withDb';
import { NextApiRequest, NextApiResponse } from 'next';
import Word from '../../../models/word';
import handler from 'next-connect';
import { getDefinition } from '../../../utils/helpers';
import Quiz, { QuizInterface } from '../../../models/quiz';
import User from '../../../models/user';
// const Word = {};
const router = handler<NextApiRequest, NextApiResponse>();
router
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { user_id } = req.cookies;
    const setting = await getSetting(user_id);
    if (!setting) {
      return res.status(409).json({ errorMessage: 'something went wrong' });
    }
    const { max } = setting;
    const { date } = req.body;
    res.json(await generateQuiz({ user_id, max, date }));
  })
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { user_id } = req.cookies;

    try {
      const quizes = await Quiz.find<QuizInterface>({ user_id });

      res.json({
        data: quizes.map(q => {
          const all = q.words.length;
          const trues = q.words.filter(w => w.answer === true).length;
          return {
            // @ts-ignore
            ...q._doc,
            statistics: [(all - trues) / all, trues / all],
          };
        }),
      });
    } catch (error) {
      console.log(error);
    }
  });
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
const getSetting = async (
  user_id: string
): Promise<{ max: number; quiz_per_day: number } | undefined> => {
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
