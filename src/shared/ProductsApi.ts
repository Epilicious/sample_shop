import axios, { AxiosResponse, Method } from "axios";
import { useEffect, useState } from "react";

type Setter<T> = (data: T) => void;

export function useProductApi<T>(
  method: Method,
  path: string
): [T | undefined, Setter<T>] {
  const [data, setData] = useState<T>();

  useEffect(() => {
    productApi(method, path, (data_: T) => setData(data_));
  }, [method, path]);

  return [data, setData];
}

export function productApi<T>(
  method: Method,
  path: string,
  callback: Setter<T>,
  data = {}
): void {
  const baseUrl = "https://fakestoreapi.com";

  axios({
    method,
    url: `${baseUrl}/${path}`,
    data,
  }).then((response: AxiosResponse<T>) => callback(response.data));
}
