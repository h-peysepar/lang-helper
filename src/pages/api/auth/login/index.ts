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
      res.status(422).json({ errorMessage: 'Username Or Password Is Not Correct' });
      return;
    }
    if (password === user.password) {
      const token = jwt.sign({ _id: user._id }, 'hadisupersecretkey', {
        expiresIn: 60 * 60 * 24 * 7,
      });
      res.json({ data: { token, success: true } });
      return;
    } else {
      res.status(422).json({ errorMessage: 'Username Or Password Is Not Correct' });
      return;
    }
  });
});

export default withDb(router);
