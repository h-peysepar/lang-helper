import { NextApiRequest, NextApiResponse } from 'next';
import withDb, { DbObject } from '../../../../utils/withDb';
import jwt from 'jsonwebtoken';

const handler = function (
  req: NextApiRequest,
  res: NextApiResponse,
  db: DbObject
) {
  let { username, password } = req.body || {};
  username = username.trim();
  const { users } = db.data || {};
  const target = users?.find(user => user.username === username);
  if (!target || target.password !== password) {
    res
      .status(422)
      .json({ errorMessage: 'Username Or Password Is Not Correct' });
    return;
  }
  const token = jwt.sign({ _id: target.id }, 'hadisupersecretkey', {
    expiresIn: 60 * 60 * 24 * 7,
  });
  res.json({ data: { token, success: true } });
};

export default withDb(handler);
