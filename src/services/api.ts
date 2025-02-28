import {fileLogger} from '@helpers/fileLogger';
import axios, {AxiosError} from 'axios';
import {tokenStorage, clearToken} from '@cache/token';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(async config => {
  const token = await tokenStorage();

  config.params = {
    ...(config.params as Record<string, string | number | boolean>),
  };

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  fileLogger.info(`Request: ${config.method?.toUpperCase()} ${config.url}`);
  if (config.data) {
    fileLogger.debug(`Request data: ${JSON.stringify(config.data)}`);
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    fileLogger.error(`API Error: ${error.message}`);

    if (error.response) {
      fileLogger.error(`Response Status: ${error.response.status}`);
      fileLogger.error(`Response Data: ${JSON.stringify(error.response.data)}`);

      if (error.response.status === 401) {
        fileLogger.warn('Unauthorized error - clearing token.');
        await clearToken();
      }

      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);

export default api;
