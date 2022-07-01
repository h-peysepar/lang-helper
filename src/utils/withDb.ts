/* This is a database connection function*/
import { connect, connection } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

let u: string;
const voidFn = () => {};
export async function connectDb({
  onSuccess = voidFn,
  onError = voidFn,
}: {
  onSuccess?: Function;
  onError?: Function;
}) {
  const db_url = process.env.MONGO_LOCAL || process.env.MONGO_URI;
  u = db_url;
  if (connection.readyState === 1) {
    return console.log('db: already connected');
  }
  try {
    await connect(db_url);
    onSuccess && onSuccess();
  } catch (err: any) {
    console.log('DBERROR:', err.message);
    onError && onError(err);
  }
}

export default function withDb(func: Function) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // @ts-ignore
    await connectDb({
      onError: (error: Error) =>
        res.status(500).json({
          errorMessage: 'unexpected thing occured!',
          error: error.message,
          url: u,
        }),
    });
    func(req, res);
  };
}
