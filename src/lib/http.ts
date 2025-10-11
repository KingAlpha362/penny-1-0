import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const DEFAULT_TIMEOUT = 10_000;
const DEFAULT_RETRIES = 2;

export async function httpGet<T = any>(url: string, config?: AxiosRequestConfig, retries = DEFAULT_RETRIES): Promise<AxiosResponse<T>> {
  try {
    return await axios.get<T>(url, { timeout: DEFAULT_TIMEOUT, ...config });
  } catch (err) {
    if (retries > 0) {
      // simple exponential backoff
      await new Promise(res => setTimeout(res, 500 * Math.pow(2, DEFAULT_RETRIES - retries)));
      return httpGet(url, config, retries - 1);
    }
    throw err;
  }
}

export async function httpPost<T = any>(url: string, data?: any, config?: AxiosRequestConfig, retries = DEFAULT_RETRIES): Promise<AxiosResponse<T>> {
  try {
    return await axios.post<T>(url, data, { timeout: DEFAULT_TIMEOUT, ...config });
  } catch (err) {
    if (retries > 0) {
      await new Promise(res => setTimeout(res, 500 * Math.pow(2, DEFAULT_RETRIES - retries)));
      return httpPost(url, data, config, retries - 1);
    }
    throw err;
  }
}

export default axios;
