import axios from 'axios';
import { useBearStore } from '../bearState';

type Method = 'get' | 'post' | 'patch' | 'delete';
interface APIResponse<D, E> {
  data: D;
  errors: E;
}

export const useRequest = () => {
  const idToken = useBearStore((state) => state.idToken);

  const request = async <D, E = null>(
    method: Method,
    path: string,
    data?: unknown,
  ) => {
    const res = await axios<APIResponse<D, E>>({
      method,
      url: import.meta.env.VITE_API_URL + path,
      data,
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      validateStatus: (status) => {
        return status < 500;
      },
    });

    if (res.status === 200) return res.data.data;

    if (res.status === 400) return Promise.reject(res.data.errors);

    console.log(res);

    return Promise.reject(null);
  };

  return request;
};
