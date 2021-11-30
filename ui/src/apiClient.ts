import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { useCallback } from "react";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const setAuthorizationHeader = (val: string) => (axios.defaults.headers.common["Authorization"] = val);
export const clearAuthorizationHeader = () => delete axios.defaults.headers.common["Authorization"];

export const useApi = <R>(
  method: Method,
  url: string,
  config?: AxiosRequestConfig
): ((data?: any) => readonly [Promise<AxiosResponse<R>>, () => void]) => {
  return useCallback(
    (data?: any) => {
      const canceler = new AbortController();
      const configWithCancel = { ...config, signal: canceler.signal };

      switch (method) {
        case "get":
        case "GET":
          return [axios.get(url, configWithCancel), canceler.abort] as const;
        case "delete":
        case "DELETE":
          return [axios.delete(url, configWithCancel), canceler.abort] as const;
        case "head":
        case "HEAD":
          return [axios.head(url, configWithCancel), canceler.abort] as const;
        case "options":
        case "OPTIONS":
          return [axios.options(url, configWithCancel), canceler.abort] as const;
        case "post":
        case "POST":
          return [axios.post(url, data, configWithCancel), canceler.abort] as const;
        case "put":
        case "PUT":
          return [axios.put(url, data, configWithCancel), canceler.abort] as const;
        case "patch":
        case "PATCH":
          return [axios.patch(url, data, configWithCancel), canceler.abort] as const;
        default:
          return [Promise.reject(new Error(`Unsupported method ${method}`)), canceler.abort] as const;
      }
    },
    [method, url, config]
  );
};
