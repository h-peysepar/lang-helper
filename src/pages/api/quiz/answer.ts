import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import Quiz from '../../../models/quiz';
import Word from '../../../models/word';
const router = handler<NextApiRequest, NextApiResponse>();

router.patch(async (req, res) => {
  const { quiz_id, word_id } = req.body;
  if (!quiz_id || !word_id) {
    res.status(422).json({ errorMessage: 'quiz_id or word_id is missed' });
  }
  const { answer } = req.query;
  console.log({answer})
  if (!answer)
    res
      .status(400)
      .json({ errorMessage: 'specify answer in query => ?answer=true' });
  let nameOfKey;
  switch (answer) {
    case 'true':
      nameOfKey = 'countOfRightAnswers';
      break;
    case 'false':
      nameOfKey = 'countOfWrongAnswers';
      break;
  }
  try {
    console.log(1111111111111111111)
    const [quiz, word] = await Promise.all([
      Quiz.findOne({ $and: [{ _id: quiz_id }, { 'words.word': word_id }] }),
      Word.findOne({ user_id: req.user_id, _id: word_id }),
    ]);
    console.log(word)
    console.log(2222222222222222)
    const targetWord = quiz.words.find(({ word }: any) => word == word_id);
    console.log(33333333333333333)
    targetWord.is_answered = true;
    word[nameOfKey]++;
    if (quiz.words.map(word => word.is_answered).every(bool => bool)) {
      quiz.is_done = true;
    }
    const [, savedWord] = await Promise.all([quiz.save(), word.save()]);
    res.json({ data: { success: true, _id: savedWord._id } });
  } catch (error) {
    console.log(error)
    res.json(error);
  }
});
export default router;