/* This is a database connection function*/
import type { NextApiRequest, NextApiResponse } from 'next';
// Remember to set type: module in package.json or use .mjs extension
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { Low } from 'lowdb';
// @ts-ignore
import { JSONFile } from 'lowdb/node';

//##todo: refactor interfaces.
interface User {
  username: string;
  password: string;
  quiz_per_day: number;
  countof_correct_answers_to_pass_word: number;
  id: string;
}
export interface DbData {
  users: User[];
  posts: [];
  quizes: [];
}
export type DbObject = Low<DbData>;
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

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
      db.data = { posts: [], users: [], quizes: [] };
      await db.write();
    }
    onSuccess?.();
    return db;
  } catch (err: any) {
    onError?.(err);
    return db;
  }
}

export default function withDb(func: Function) {
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
