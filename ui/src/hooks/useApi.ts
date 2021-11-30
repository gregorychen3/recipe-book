import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getNextRequestId, putRequest, removeRequest } from "../app/apiSlice";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const setAuthHeader = (val: string) => (axios.defaults.headers.common["Authorization"] = val);
export const clearAuthHeader = () => delete axios.defaults.headers.common["Authorization"];

export const useApi = <R>(
  method: Method,
  url: string,
  config?: AxiosRequestConfig
): ((data?: any) => readonly [Promise<AxiosResponse<R>>, () => void]) => {
  const d = useDispatch();
  return useCallback(
    (data?: any) => {
      const id = getNextRequestId();
      d(putRequest({ id, method, url, data }));

      const canceler = new AbortController();
      const configWithCancel = { ...config, signal: canceler.signal };

      let promise: Promise<AxiosResponse<R>>;

      switch (method) {
        case "get":
        case "GET":
          promise = axios.get(url, configWithCancel);
          break;
        case "delete":
        case "DELETE":
          promise = axios.delete(url, configWithCancel);
          break;
        case "head":
        case "HEAD":
          promise = axios.head(url, configWithCancel);
          break;
        case "options":
        case "OPTIONS":
          promise = axios.options(url, configWithCancel);
          break;
        case "post":
        case "POST":
          promise = axios.post(url, data, configWithCancel);
          break;
        case "put":
        case "PUT":
          promise = axios.put(url, data, configWithCancel);
          break;
        case "patch":
        case "PATCH":
          promise = axios.patch(url, data, configWithCancel);
          break;
        default:
          return [Promise.reject(new Error(`Unsupported method ${method}`)), canceler.abort] as const;
      }

      return [
        promise
          .catch((e) => {
            // toast
            throw e;
          })
          .finally(() => d(removeRequest({ id }))),
        canceler.abort,
      ] as const;
    },
    [method, url, config, d]
  );
};
