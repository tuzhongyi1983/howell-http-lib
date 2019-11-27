import { AxiosInstance, AxiosRequestConfig, AxiosStatic, AxiosResponse } from "axios";
import { ClientCredentials } from "./credentials";
export declare class AxiosDigestInstance {
    protected readonly axios: AxiosInstance | AxiosStatic;
    private username;
    private passwd;
    private webBrowserAuth;
    constructor(username: string, passwd: string, webBrowserAuth?: boolean, customAxios?: AxiosInstance | AxiosStatic);
    set clientCredentials(credentials: ClientCredentials);
    get clientCredentials(): ClientCredentials;
    get<TResult = any>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<TResult>>;
    post<TRequest = any, TResult = any>(path: string, data?: TRequest, config?: AxiosRequestConfig): Promise<AxiosResponse<TResult>>;
    put<TRequest = any, TResult = any>(path: string, data?: TRequest, config?: AxiosRequestConfig): Promise<AxiosResponse<TResult>>;
    delete<TResult = any>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<TResult>>;
    head<TResult = any>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<TResult>>;
    patch<TRequest = any, TResult = any>(path: string, data?: TRequest, config?: AxiosRequestConfig): Promise<AxiosResponse<TResult>>;
    private getWwwAuth;
    private getAuthHeader;
}
