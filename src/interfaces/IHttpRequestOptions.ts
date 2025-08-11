export interface IHttpRequestOptions {
    queryParams?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
    body?: any;
    auth?: boolean;
    tokenType?: string;
    params?: Record<string, string | number>;
}