import { routeHandler } from '../../../utils/withDb';

import Quiz, { QuizWord } from '../../../models/quiz';
import withProtect from '../../../utils/withProtect';

const router = routeHandler({
  POST: async (req, res, db) => {
    const { user_id } = req.cookies;
    const target = db.data?.users.find(user => user.id === user_id);
    if (!target) {
      return res.status(409).json({ errorMessage: 'something went wrong' });
    }
    const { correct_answers_capacity } = target;
    const { words } = db.data || {};
    if (!words) {
      return res.json({ errorMessage: 'No word provided!' });
    }
    const quizWords: QuizWord[] = words.reduce((output, word) => {
      if (
        user_id === word.user_id &&
        word.countOfRightAnswers < correct_answers_capacity
      ) {
        output.push({
          ...word,
          // @ts-ignore
          answer: null,
        });
      }
      return output;
    }, []);
    if (!quizWords.length) {
      return res.json({ errorMessage: 'No word provided!' });
    }
    const quiz = new Quiz(user_id, quizWords);
    db.data?.quizes.push(quiz);
    await db.write();
    res.json(quiz);
  },
  GET: async (req, res, db) => {
    const { user_id } = req.cookies;
    const quizes = db.data?.quizes.filter(quiz => quiz.user_id === user_id);
    if (!quizes?.length) {
      return res.json({ message: 'No Quiz Found!' });
    }
    res.json({
      data: quizes
        .map(q => {
          const all = q.words.length;
          const trues = q.words.filter(w => w.answer === true).length;
          return {
            ...q,
            statistics: [(all - trues) / all, trues / all],
          };
        })
        .reverse(),
    });
  },
});

export default withProtect(router);
