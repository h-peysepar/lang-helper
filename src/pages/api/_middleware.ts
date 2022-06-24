import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.url?.split('/')[4] !== 'auth') {
    try {
      const token = req.headers.get('token');
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
