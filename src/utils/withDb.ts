/* This is a database connection function*/
import { connect, connection } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

const voidFn = () => {};
export async function connectDb({
  onSuccess = voidFn,
  onError = voidFn,
}: {
  onSuccess?: Function;
  onError?: Function;
}) {
  const db_url =
    process.env.NODE_ENV !== 'production'
      ? process.env.MONGO_LOCAL
      : process.env.MONGO_URI;

  if (connection.readyState === 1) {
    return console.log('db: already connected');
  }
  try {
    await connect(db_url);
    onSuccess && onSuccess();
  } catch (err: any) {
    console.log('DBERROR:', err.message);
    onError && onError(err)
  }
}

export default function withDb(func: Function) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // @ts-ignore
    await connectDb({onError: (error) => res.json({errorMessage: 'unexpected thing occured!', error})});
    func(req, res);
  };
}
