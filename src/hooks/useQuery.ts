import { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useQuery as _useQuery, UseQueryOptions, QueryKey } from 'react-query';
import { axios } from '../utils/api';
import { clearToken } from '../utils/helpers';
export default function useQuery<T>(
  key: QueryKey,
  url: string,
  queryOptions?: UseQueryOptions<T>,
  requestOptions?: AxiosRequestConfig
) {
  const router = useRouter();

  const fetcher = useCallback(
    (url: string, opts?: object) => (): Promise<T> =>
      new Promise((res, rej) =>
        axios
          .get(url, opts)
          .then(({ data }) => {
            const { data: pureData, ...others } = data;
            if (data && !Object.keys(others).length) {
              return res(pureData);
            }
            res(data);
          })
          .catch(error => {
            if (error.response.status === 401) {
              router.push('/sign-in');
              clearToken();
            }
            rej(error);
          })
      ),
    [router]
  );
  const query = _useQuery<T>(key, fetcher(url, requestOptions), queryOptions);
  return query;
}
