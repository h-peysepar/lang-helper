import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import Quiz from '../../../models/quiz';
import Word from '../../../models/word';
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
    const { word_id, answer }: { answer: boolean } = req.body;
    const { id: quiz_id } = req.query;
    if (!quiz_id || !word_id) {
      res.status(422).json({ errorMessage: 'quiz_id or word_id is missed' });
    }
    if (!Object.keys(req.body).indexOf('answer'))
      res.status(422).json({ errorMessage: 'answer is missed' });

    const key = answer ? 'countOfRightAnswers' : 'countOfWrongAnswers';

    try {
      const [quiz, word] = await Promise.all([
        Quiz.findOne({ $and: [{ _id: quiz_id }, { 'words.word': word_id }] }),
        Word.findOne({ user_id: req.cookies.user_id, _id: word_id }),
      ]);
      const targetWord = quiz.words.find(({ word }: any) => word == word_id);
      targetWord.answer = answer;
      word[key]++;
      if (quiz.words.every(i => i.answer === null)) {
        quiz.is_done = true;
      }
      const [, savedWord] = await Promise.all([quiz.save(), word.save()]);
      res.json({ data: { success: true, _id: savedWord._id } });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

export default router;
