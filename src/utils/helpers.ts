import axios from 'axios';
import { axios as encancedAxios } from './api';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
export function getDefinition(word: string) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fa&hl=en-US&dt=t&dt=bd&dj=1&q=${word}`;
  return axios
    .get(url)
    .then(({ data }: { data: any }) => data.sentences[0].trans);
}
// export function errorMaker(message: string, code = 500) {
//   const err = new Error(message)
//   err. = code;
//   return err
// }
export const getToken = () => Cookies.get('auth');
export const clearToken = () => {
  Cookies.remove('auth');
  Cookies.remove('uesr_id');
};
export const setToken = token => {
  Cookies.set('auth', token);
  Cookies.set('user_id', jwt_decode(token)._id);
};
export const fetcher = (url, opts) => () =>
  new Promise((res, rej) =>
    encancedAxios.get(url, opts).then(({ data }) => {
      const { data: pureData, ...others } = data;
      if (data && !Object.keys(others).length) {
        return res(pureData);
      }
      res(data);
    })
  );
export const EnNumber = function (num) {
  if (typeof num !== 'string') return num;
  const nums = {
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
