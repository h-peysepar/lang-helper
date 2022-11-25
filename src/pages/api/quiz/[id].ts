import { Types } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import Quiz, { QuizType, QuizWord } from '../../../models/quiz';
import Word from '../../../models/word';
import withDb, { routeHandler } from '../../../utils/withDb';
import withProtect from '../../../utils/withProtect';

const router = routeHandler({
  GET: async function (req, res, db) {
    const { user_id } = req.cookies;
    try {
      const quizData = db.data?.quizes.find(
        quiz => quiz.id === req.query.id && quiz.user_id === user_id
      );
      res.send({ data: quizData });
    } catch (error) {}
  },
  PATCH: async (req, res, db) => {
    const { word_id, answer }: { answer: boolean; word_id: string } = req.body;
    const { id: quiz_id } = req.query;
    if (!quiz_id || !word_id) {
      res.status(422).json({ errorMessage: 'quiz_id or word_id is missed' });
    }
    if (Object.keys(req.body).indexOf('answer') === -1)
      res.status(422).json({ errorMessage: 'answer is missed' });

    const key = answer ? 'countOfRightAnswers' : 'countOfWrongAnswers';
    const { quizes, words } = db.data || {};
    const quiz = quizes?.find(quiz => quiz.id === quiz_id);
    const word = words?.find(word => word.id === word_id);
    if (!quiz || !word) {
      return res.status(409).json({ errorMessage: 'something went wrong' });
    }
    const quizWord = quiz.words.find(word => word.id === word_id);
    //@ts-ignore
    quizWord.answer = answer;
    if (!quiz.words.some(q => q.answer === null)) {
      quiz.is_done = true;
    }
    word[key]++;
    db.write();
    res.json({ success: true });
    // try {
    //   const [quiz, word] = await Promise.all([
    //     Quiz.findOne<QuizInterface>({
    //       $and: [{ _id: quiz_id }, { 'words.word': word_id }],
    //     }),
    //     Word.findOne({ user_id: req.cookies.user_id, _id: word_id }),
    //   ]);
    //   if (!quiz)
    //     return res.status(409).json({ errorMessage: 'something went wrong' });
    //   const targetWord = quiz.words.find(({ word }) => word == word_id);
    //   if (!targetWord)
    //     return res.status(409).json({ errorMessage: 'something went wrong' });
    //   targetWord.answer = answer;
    //   word[key]++;
    //   if (quiz.words.every(i => i.answer !== null)) {
    //     quiz.is_done = true;
    //   }
    //   // @ts-ignore
    //   const [, savedWord] = await Promise.all([quiz.save(), word.save()]);
    //   res.json({ data: { success: true, _id: savedWord._id } });
    // } catch (error) {
    //   res.json(error);
    // }
  },
});

export default withProtect(withDb(router));
