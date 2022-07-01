import { NextApiRequest, NextApiResponse } from 'next';
import withDb from '../../../../utils/withDb';
import handler from 'next-connect';
import jwt from 'jsonwebtoken';
import User from '../../../../models/user';

const router = handler<NextApiRequest, NextApiResponse>();

router.post((req: NextApiRequest, res: NextApiResponse) => {
  let { username, password } = req.body || {};
  username = username.trim();
  User.findOne({ username }).then(user => {
    if (!user) {
      res.status(404).json({ errorMessage: 'user not found' });
    }
    if (password === user.password) {
      const token = jwt.sign({ _id: user._id }, 'hadisupersecretkey', {
        expiresIn: 60 * 60 * 24 * 7,
      });
      res.json({ data: { token, success: true } });
    } else {
      return res.status(404).send('user not fount');
    }
  });
});

export default withDb(router);
