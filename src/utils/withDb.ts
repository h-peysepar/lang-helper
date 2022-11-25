/* This is a database connection function*/
import type { NextApiRequest, NextApiResponse } from 'next';
// Remember to set type: module in package.json or use .mjs extension
import { join, resolve } from 'path';

import { Low } from 'lowdb';
// @ts-ignore
import { JSONFile } from 'lowdb/node';
import { WordType } from '../models/word';
import { UserType } from '../models/user';
import { QuizType } from '../models/quiz';

export interface DbData {
  users: UserType[];
  words: WordType[];
  quizes: QuizType[];
}
export type DbObject = Low<DbData>;
const file = join(resolve('./'), 'db.json');

export async function connectDb(props?: {
  onSuccess?: Function;
  onError?: Function;
}) {
  const { onSuccess, onError } = props || {};
  const adapter = new JSONFile<DbData>(file);
  const db = new Low<DbData>(adapter);
  try {
    await db.read();
    if (db.data === null) {
      db.data = { words: [], users: [], quizes: [] };
      await db.write();
    }
    onSuccess?.();
    return db;
  } catch (err: any) {
    onError?.(err);
    return db;
  }
}
type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => void;
type RESTAPIHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  db: DbObject
) => void;
export default function withDb(func: RESTAPIHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const db: Low<DbData> = await connectDb({
      onError: (error: Error) =>
        res.status(500).json({
          errorMessage: 'unexpected thing occured!',
          error: error.message,
        }),
    });
    func(req, res, db);
  };
}
// type ApiHandler = (req: NextApiRequest, res: NextApiResponse, db: DbObject) =>
export const routeHandler = function (handlers: {
  GET?: RESTAPIHandler;
  POST?: RESTAPIHandler;
  PATCH?: RESTAPIHandler;
  DELETE?: RESTAPIHandler;
}) {
  return withDb(function (req, res, db) {
    // @ts-ignore
    handlers[req.method?.toUpperCase() || 'GET']?.(req, res, db);
  });
};
