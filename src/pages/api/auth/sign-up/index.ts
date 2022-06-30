import { NextApiRequest, NextApiResponse } from 'next';
import User, { UserInterface } from '../../../../models/user';
import { connectDb } from '../../../../utils/withDb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password, confirm_password, ...others } = req.body || {};
  if (!Object.keys(others)) return res.status(422).json({ hasError: true });
  if (password !== confirm_password) {
    return res.status(422).json({
      hasError: true,
      errorMessage: "Password dosn't match confirm password",
    });
  }
  await connectDb({});
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(409).send('This username already exist!');
    }
  } catch (err) {
    res.status(409).send('unexpected error has occured!');
  }
  const user = new User({ username, password });
  user
    .save()
    .then((user: UserInterface) => res.json({ success: true, data: { user } }));
}
