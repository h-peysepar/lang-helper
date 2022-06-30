import { Types } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import Quiz, { QuizInterface } from '../../../models/quiz';
import Word from '../../../models/word';
import withDb from '../../../utils/withDb';
import withProtect from '../../../utils/withProtect';

const router = handler<NextApiRequest, NextApiResponse>();
router
  .get(async function (req, res) {
    const { user_id } = req.cookies;
    try {
      const quizData = await Quiz.findOne({
        user_id,
        _id: req.query.id,
      }).populate('words.word', 'word definition');
      res.send({ data: quizData });
    } catch (error) {}
  })
  .patch(async (req, res) => {
    const { word_id, answer }: { answer: boolean; word_id: Types.ObjectId } =
      req.body;
    const { id: quiz_id } = req.query;
    if (!quiz_id || !word_id) {
      res.status(422).json({ errorMessage: 'quiz_id or word_id is missed' });
    }
    if (!Object.keys(req.body).indexOf('answer'))
      res.status(422).json({ errorMessage: 'answer is missed' });

    const key = answer ? 'countOfRightAnswers' : 'countOfWrongAnswers';

    try {
      const [quiz, word] = await Promise.all([
        Quiz.findOne<QuizInterface>({
          $and: [{ _id: quiz_id }, { 'words.word': word_id }],
        }),
        Word.findOne({ user_id: req.cookies.user_id, _id: word_id }),
      ]);
      if (!quiz)
        return res.status(409).json({ errorMessage: 'something went wrong' });
      const targetWord = quiz.words.find(({ word }) => word == word_id);
      if (!targetWord)
        return res.status(409).json({ errorMessage: 'something went wrong' });
      targetWord.answer = answer;
      word[key]++;
      if (quiz.words.every(i => i.answer !== null)) {
        quiz.is_done = true;
      }
      // @ts-ignore
      const [, savedWord] = await Promise.all([quiz.save(), word.save()]);
      res.json({ data: { success: true, _id: savedWord._id } });
    } catch (error) {
      res.json(error);
    }
  });

export default withProtect(withDb(router));
