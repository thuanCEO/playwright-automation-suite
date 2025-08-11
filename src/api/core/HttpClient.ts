import { APIRequestContext, request, APIResponse } from '@playwright/test';
import { HttpStatusHelper } from '@helpers/HttpStatusHelper';
import { TokenManager } from '@api/core/TokenManager';
import { IHttpRequestOptions } from '@interfaces/IHttpRequestOptions';
import { ContentTypeEnum } from '@enums/ContentTypeEnum'

export class HttpClient {
    private static context: APIRequestContext;

    /**
     * Initialize the HTTP context with base URL and optional global headers.
     * @param baseURL The base URL for all requests (e.g. "https://api.example.com")
     * @param headers Optional default headers for every request
     */
    static async init(baseURL: string, headers: Record<string, string> = {}) {
        this.context = await request.newContext({
            baseURL,
            extraHTTPHeaders: headers,
        });
    }

    /**
     * Ensure the HTTP client has been initialized before use.
     * Throws an error if not initialized.
     */
    private static ensureContext() {
        if (!this.context) throw new Error('HttpClient not initialized. Call HttpClient.init() first.');
    }

    /**
     * Build full URL with optional query parameters.
     * @param url Relative or full URL path
     * @param queryParams Optional key-value pairs for query string
     * @returns Full URL with query string if provided
     */
    private static buildUrl(url: string, queryParams?: Record<string, string | number | boolean>): string {
        if (!queryParams) return url;
        const query = Object.entries(queryParams)
            .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            .join('&');
        return `${url}?${query}`;
    }

    /**
     * Build final headers with optional Authorization token if `auth` is true.
     * @param customHeaders Additional headers
     * @param auth If true, adds Authorization header
     * @returns Merged headers
     */
    private static async buildHeaders(
        customHeaders?: Record<string, string>,
        auth?: boolean,
        method: string = 'GET',
        body?: any
    ): Promise<Record<string, string>> {
        const headers = { ...(customHeaders || {}) };

        // Add Authorization token if auth is true
        if (auth) {
            const token = await TokenManager.get();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        // Auto set Content-Type if not provided
        const methodWithBody = ['POST', 'PUT', 'PATCH'];
        const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

        if (methodWithBody.includes(method.toUpperCase()) && !headers['Content-Type']) {
            headers['Content-Type'] = isFormData ? ContentTypeEnum.MULTIPART : ContentTypeEnum.JSON;
        }

        return headers;
    }

    /**
     * Perform a GET request.
     * @param url Request URL (relative or full)
     * @param options Optional request configuration (headers, queryParams, auth)
     * @returns APIResponse
     */
    static async get(url: string, options: IHttpRequestOptions = {}): Promise<APIResponse> {
        this.ensureContext();
        const fullUrl = this.buildUrl(url, options.queryParams);
        const headers = await this.buildHeaders(options.headers, options.auth);
        this.logRequest('GET', fullUrl, headers);
        return this.context.get(fullUrl, { headers });
    }

    /**
     * Perform a POST request.
     * @param url Request URL
     * @param options Optional request configuration (headers, queryParams, body, auth)
     * @returns APIResponse
     */
    static async post(url: string, options: IHttpRequestOptions = {}): Promise<APIResponse> {
        this.ensureContext();
        const fullUrl = this.buildUrl(url, options.queryParams);
        const headers = await this.buildHeaders(options.headers, options.auth);
        this.logRequest('POST', fullUrl, headers, options.body);
        return this.context.post(fullUrl, { headers, data: options.body });
    }

    /**
     * Perform a PUT request.
     * @param url Request URL
     * @param options Optional request configuration (headers, queryParams, body, auth)
     * @returns APIResponse
     */
    static async put(url: string, options: IHttpRequestOptions = {}): Promise<APIResponse> {
        this.ensureContext();
        const fullUrl = this.buildUrl(url, options.queryParams);
        const headers = await this.buildHeaders(options.headers, options.auth);
        this.logRequest('PUT', fullUrl, headers, options.body);
        return this.context.put(fullUrl, { headers, data: options.body });
    }

    /**
     * Perform a DELETE request.
     * @param url Request URL
     * @param options Optional request configuration (headers, queryParams, auth)
     * @returns APIResponse
     */
    static async delete(url: string, options: IHttpRequestOptions = {}): Promise<APIResponse> {
        this.ensureContext();
        const fullUrl = this.buildUrl(url, options.queryParams);
        const headers = await this.buildHeaders(options.headers, options.auth);
        this.logRequest('DELETE', fullUrl, headers);
        return this.context.delete(fullUrl, { headers });
    }

    /**
     * Perform a PATCH request.
     * @param url Request URL
     * @param options Optional request configuration (headers, queryParams, body, auth)
     * @returns APIResponse
     */
    static async patch(url: string, options: IHttpRequestOptions = {}): Promise<APIResponse> {
        this.ensureContext();
        const fullUrl = this.buildUrl(url, options.queryParams);
        const headers = await this.buildHeaders(options.headers, options.auth);
        this.logRequest('PATCH', fullUrl, headers, options.body);
        return this.context.patch(fullUrl, { headers, data: options.body });
    }

    /**
     * Parse and return the JSON body from a response.
     * @param response The APIResponse object
     * @returns Parsed JSON as object of type T
     */
    static async getJson<T = any>(response: APIResponse): Promise<T> {
        return await response.json();
    }

    /**
     * Assert the response has the expected status code.
     * @param response APIResponse
     * @param expectedStatus Expected HTTP status (e.g. 200)
     */
    static async assertStatus(response: APIResponse, expectedStatus: number): Promise<void> {
        const actualStatus = response.status();
        if (actualStatus !== expectedStatus) {
            const statusInfo = HttpStatusHelper.getByCode(actualStatus);
            throw new Error(
                `Expected status ${expectedStatus}, but got ${actualStatus} - ${statusInfo?.text || 'Unknown'}`
            );
        }
    }

    /**
     * Log response status with status text and description.
     * @param response APIResponse
     */
    static async logResponse(response: APIResponse): Promise<void> {
        const status = response.status();
        const statusInfo = HttpStatusHelper.getByCode(status);
        console.log(`[HTTP ${status}] ${statusInfo?.text} - ${statusInfo?.description}`);
    }

    /**
     * Log outgoing request details for debugging.
     * @param method HTTP method
     * @param url Request URL
     * @param headers Optional headers
     * @param data Optional request body
     */
    static logRequest(method: string, url: string, headers?: Record<string, string>, data?: any): void {
        console.log(`[REQUEST] ${method.toUpperCase()} ${url}`);
        if (headers) console.log(`Headers: ${JSON.stringify(headers, null, 2)}`);
        if (data) console.log(`Payload: ${JSON.stringify(data, null, 2)}`);
    }
}
