/* This is a database connection function*/
import { connect, connection } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';


export async function connectDb(callback = () => {}) {
  const db_url = process.env.NODE_ENV !== 'production' ? process.env.MONGO_LOCAL : process.env.MONGO_URI
  
  if(connection.readyState === 1){
    return console.log('db: already connected')
  }
  try {
    await connect(db_url);
    callback();
  } catch (err: any) {
    console.log('oh no: ', err.message);
  }
}

export default function withDb(func: Function) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    await connectDb();
    func(req, res);
  };
}
