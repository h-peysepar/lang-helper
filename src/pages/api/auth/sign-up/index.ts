import { Low } from 'lowdb/lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { ID } from '../../../../utils/helpers';
import withDb, { DbObject } from '../../../../utils/withDb';

async function handler(req: NextApiRequest, res: NextApiResponse, db: DbObject) {
  const { username, password, confirm_password } = req.body || {};
  if (password !== confirm_password) {
    return res.status(422).json({
      hasError: true,
      errorMessage: "Password dosn't match confirm password",
    });
  }
  try {
    const { users } = db.data || {};
    const user = users?.find(i => i.username === username);
    if (user) {
      res.status(409).send('This username already exist!');
    }
    const newUser = {
      username,
      password,
      quiz_per_day: 1,
      countof_correct_answers_to_pass_word: 12,
      id: ID('users'),
    }
    users?.push(newUser);
    await db.write();
    res.json({ success: true, data: newUser });
  } catch (err) {
    res.status(409).send('unexpected error has occured!');
  }
}
export default withDb(handler);
