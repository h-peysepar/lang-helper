import axioss from 'axios';
import { getToken } from './helpers';

export const axios = axioss.create({baseURL: '/api'});
axios.interceptors.request.use(function (config) {
  const token = getToken();
  config.headers.token = token;

  return config;
});
