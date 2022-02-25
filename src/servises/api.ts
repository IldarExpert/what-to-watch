import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
import {getToken} from './token';


const BACKEND_URL = 'https://9.react.pages.academy/wtw';

export const createAPI = (onNoAuth: () => void) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: 5000,
  });

  api.interceptors.request.use(
    (config:AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
    (error) => {
    return Promise.reject(error);
  });

  api.interceptors.response.use(
    (response:AxiosResponse) => response,
    (error) => {
      const {response} = error;

      if(response.status === 401) {
        return onNoAuth();
      }
    return Promise.reject(error);
  });

  return api
}
