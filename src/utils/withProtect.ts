import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const withProtect = function (handler: Function) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const token = req.cookies.auth;
      jwt.verify(token, 'hadisupersecretkey');
      handler(req, res);
    } catch (error) {
      res.status(401).json({ error });
    }
  };
};
export default withProtect;
