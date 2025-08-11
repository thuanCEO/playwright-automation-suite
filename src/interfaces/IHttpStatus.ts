export interface IHttpStatus {
    code: number;
    text: string;
    description: string;
    category: 'SUCCESS' | 'CLIENT_ERROR' | 'SERVER_ERROR';
    severity: 'info' | 'warning' | 'critical';
    context?: string;
    isRetryable?: boolean;
}
