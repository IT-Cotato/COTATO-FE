import axios, { AxiosRequestConfig } from 'axios';

export interface CotatoApiResponse<T> {
  code: string;
  message: string;
  response: T;
}

export interface CotatoApiErrorResponse {
  data: {
    code: string;
    message: string;
  };
}

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config, response } = error;

    if (response.data.code === 'T-001') {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const response = await api.post('/v1/api/auth/reissue');
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          localStorage.setItem('token', response.data.accessToken);

          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            api
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });
          refreshAndRetryQueue.length = 0;

          return api(config);
        } catch (err) {
          localStorage.removeItem('token');
          window.location.replace('/');
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config, resolve, reject });
      });
    }

    return Promise.reject(error);
  },
);

export default api;
