import axioss from 'axios';
// import { getToken } from './helpers';

export const axios = axioss.create({
  baseURL: 'http://localhost:1379/api',
  headers: {
    'x-auth-token': (() => {
      let x = '';
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        x = localStorage.getItem('token') as string;
      }
      return x as string;
    })(),
  },
});
