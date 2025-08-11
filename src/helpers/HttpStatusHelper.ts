import { HttpStatuses } from '@enums/HttpEnum';
import { IHttpStatus } from '@interfaces/IHttpStatus';

export class HttpStatusHelper {
    /**
     * Get HTTP status object by status code.
     * @param code HTTP status code (e.g., 404)
     * @returns IHttpStatus object or undefined
     */
    static getByCode(code: number): IHttpStatus | undefined {
        return HttpStatuses[code];
    }

    /**
     * Get HTTP status object by status text.
     * @param text HTTP status text (e.g., 'Unauthorized')
     * @returns IHttpStatus object or undefined
     */
    static getByText(text: string): IHttpStatus | undefined {
        return Object.values(HttpStatuses).find((status) => status.text === text);
    }

    /**
     * Check whether a given HTTP status code is retryable.
     * @param code HTTP status code
     * @returns true if retryable, false otherwise
     */
    static isRetryable(code: number): boolean {
        const status = this.getByCode(code);
        return status?.isRetryable ?? false;
    }

    /**
     * Get all HTTP status codes under a specific category.
     * @param category Category name (e.g., 'CLIENT_ERROR', 'SERVER_ERROR')
     * @returns Array of matching IHttpStatus entries
     */
    static getByCategory(category: string): IHttpStatus[] {
        return Object.values(HttpStatuses).filter((s) => s.category === category);
    }

    /**
     * Get a formatted description of an HTTP status code.
     * @param code HTTP status code
     * @returns Human-readable string of the status
     */
    static describe(code: number): string {
        const status = this.getByCode(code);
        return status
            ? `[${status.code}] ${status.text}: ${status.description}`
            : `Unknown status code: ${code}`;
    }

    /**
     * Get the context (optional technical explanation) of a given code.
     * @param code HTTP status code
     * @returns Context string or undefined
     */
    static getContext(code: number): string | undefined {
        return this.getByCode(code)?.context;
    }

    /**
     * Get the severity level of a given status code.
     * @param code HTTP status code
     * @returns Severity string (e.g., 'info', 'warning', 'critical')
     */
    static getSeverity(code: number): string | undefined {
        return this.getByCode(code)?.severity;
    }

    /**
     * Get the category of a status code (e.g., CLIENT_ERROR, SERVER_ERROR).
     * @param code HTTP status code
     * @returns Category string
     */
    static getCategory(code: number): string | undefined {
        return this.getByCode(code)?.category;
    }

    /**
     * Returns true if the code is a success (2xx).
     * @param code HTTP status code
     * @returns Boolean
     */
    static isSuccess(code: number): boolean {
        return code >= 200 && code < 300;
    }

    /**
     * Returns true if the code is a client error (4xx).
     * @param code HTTP status code
     * @returns Boolean
     */
    static isClientError(code: number): boolean {
        return code >= 400 && code < 500;
    }

    /**
     * Returns true if the code is a server error (5xx).
     * @param code HTTP status code
     * @returns Boolean
     */
    static isServerError(code: number): boolean {
        return code >= 500 && code < 600;
    }

    /**
     * List all HTTP statuses in a compact format.
     * @returns Array of { code, text } pairs
     */
    static listAllShort(): { code: number; text: string }[] {
        return Object.values(HttpStatuses).map(({ code, text }) => ({ code, text }));
    }

    /**
     * List all full HTTP status entries.
     * @returns Array of IHttpStatus
     */
    static listAll(): IHttpStatus[] {
        return Object.values(HttpStatuses);
    }
}
