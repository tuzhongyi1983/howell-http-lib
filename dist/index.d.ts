import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosStatic,
  AxiosResponse
} from "axios";

export * from "axios";

export interface UsernamePassword {
  username: string;
  passwd: string;
}

export interface ClientCredentials extends UsernamePassword {
  username: string;
  passwd: string;
  webBrowserAuth: boolean;
}

export interface AxiosDigestInstance {
  (
    username: string,
    passwd: string,
    webBrowserAuth?: boolean,
    customAxios?: AxiosInstance | AxiosStatic
  );
  clientCredentials: ClientCredentials;
  get<TResult = any>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResult>>;
  post<TRequest = any, TResult = any>(
    path: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResult>>;
  put<TRequest = any, TResult = any>(
    path: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResult>>;
  delete<TResult = any>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResult>>;
  head<TResult = any>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResult>>;
  patch<TRequest = any, TResult = any>(
    path: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResult>>;
}

export interface AxiosDigestStatic {
  create(
    username: string,
    passwd: string,
    webBrowserAuth?: boolean,
    customAxios?: AxiosInstance | AxiosStatic
  ): AxiosDigestInstance;
}

export declare const AxiosDigest: AxiosDigestStatic;

export default AxiosDigest;
