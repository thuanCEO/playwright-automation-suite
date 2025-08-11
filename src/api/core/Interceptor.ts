export class Interceptor {
    static logRequest(method: string, url: string, headers?: Record<string, string>, data?: any): void {
        console.log('----- REQUEST -----');
        console.log(`[${method}] ${url}`);
        if (headers) console.log('Headers:', headers);
        if (data) console.log('Body:', data);
    }

    static logResponse(status: number, body: any): void {
        console.log('----- RESPONSE -----');
        console.log(`Status: ${status}`);
        console.log('Body:', body);
    }

    static async handleResponse(response: import('@playwright/test').APIResponse): Promise<void> {
        const status = response.status();
        const body = await response.text();
        this.logResponse(status, body);
    }
}
