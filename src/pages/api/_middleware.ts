import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';
import { NextFetchEvent, NextResponse } from 'next/server';

export function middleware(req: NextApiRequest, ev: NextFetchEvent) {
  if (req.url?.split('/')[4] !== 'auth') {
    try {
      const token = req.cookies.auth;
      jwt.verify(token, 'hadisupersecretkey');
      NextResponse.next();
    } catch (error) {
      const res = new Response(
        'authenticated required: ' + JSON.stringify(error)
      );
      return res;
    }
  }
}
