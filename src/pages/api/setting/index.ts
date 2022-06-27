import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import User from '../../../models/user';
const router = handler<NextApiRequest, NextApiResponse>();
router
  .get(async (req, res) => {
    const { user_id } = req.cookies;
    try {
      const { setting } = await User.findById(user_id).select(
        '-setting._id -setting.time_to_remind'
      );
      res.json({ data: setting });
    } catch (error) {
      res.status(409).send('something went wrong');
    }
  })
  .patch(async (req, res) => {
    const { user_id } = req.cookies;
    try {
      const user = await User.findOne({ user_id: user_id });
      user.setting.quiz_per_day = req.body.quiz_per_day;
      user.setting.countof_correct_answers_to_pass_word =
        req.body.countof_correct_answers_to_pass_word;
      res.json({
        message: 'profile setting has been updated',
        data: await user.save(),
      });
    } catch (error) {
      res.status(409).send('something went wrong');
    }
  });
export default router;
