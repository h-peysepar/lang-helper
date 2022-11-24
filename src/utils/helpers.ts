import axios from 'axios';
import { axios as encancedAxios } from './api';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import withDb, { DbData, DbObject } from './withDb';
import type { NextApiRequest, NextApiResponse } from 'next';

export function getDefinition(word: string | string[]) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fa&hl=en-US&dt=t&dt=bd&dj=1&q=${word}`;
  return axios
    .get(url)
    .then(({ data }: { data: any }) => data.sentences[0].trans);
}

export type Token = { _id: string; exp: number; iat: number };
export const getToken = () => Cookies.get('auth');
export const clearToken = () => {
  Cookies.remove('auth');
  Cookies.remove('user_id');
};
export const setToken = (token: string) => {
  Cookies.set('auth', token);
  Cookies.set(
    'user_id',
    jwt_decode<{ user_id: number; _id: string }>(token)._id
  );
};
export const logOut = () => {
  clearToken();
  window.location.reload();
};
export const fetcher =
  <T>(url: string, opts?: object) =>
  (): Promise<T> =>
    new Promise((res, rej) =>
      encancedAxios
        .get(url, opts)
        .then(({ data }) => {
          const { data: pureData, ...others } = data;
          if (data && !Object.keys(others).length) {
            return res(pureData);
          }
          res(data);
        })
        .catch(error => rej(error))
    );
export const EnNumber = function (num: string): string {
  if (typeof num !== 'string') return num;
  const nums: any = {
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
    '۰': '0',
  };
  return num
    .split('')
    .map(i => nums[i] || i)
    .join('');
};

export const ID = (entity: keyof DbData): string =>
  `$$${entity.toUpperCase()}$$${Date.now()}`;

