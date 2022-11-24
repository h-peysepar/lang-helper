import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import User from '../../../models/user';
import withDb, { routeHandler } from '../../../utils/withDb';
import withProtect from '../../../utils/withProtect';
const router = routeHandler({
  GET: async (req, res, db) => {
    const { user_id } = req.cookies;
    const target = db.data?.users.find(user => user.id === user_id);
    if (!target) {
      return res.status(409).send('something went wrong');
    }
    const { quiz_per_day, correct_answers_capacity } = target;
    const setting = { quiz_per_day, correct_answers_capacity };
    res.json({ data: setting });
  },
  PATCH: async (req, res, db) => {
    const { user_id } = req.cookies;
    const { quiz_per_day, correct_answers_capacity } = req.body;
    User.updateSetting({
      user_id,
      quiz_per_day,
      correct_answers_capacity,
      onError() {
        res.status(404).json({ errorMessage: 'User Not Found' });
      },
    });
    res.json({ message: 'Setting has been updated!' });
  },
});

export default withProtect(withDb(router));
