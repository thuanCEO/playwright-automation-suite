import { ITokenData } from '@interfaces/ITokenData';

export class TokenManager {
    private static tokenData: ITokenData | null = null;

    /**
     * Save the current token data in memory
     */
    static save(token: ITokenData): void {
        this.tokenData = token;
    }

    /**
     * Get current access token (if not expired), or null if not available.
     */
    static async get(): Promise<string | null> {
        if (!this.tokenData) return null;
        if (this.isExpired()) return null;
        return this.tokenData.token;
    }

    /**
     * Get full token data object.
     */
    static getRaw(): ITokenData | null {
        return this.tokenData;
    }

    /**
     * Check if current token is expired.
     */
    static isExpired(): boolean {
        if (!this.tokenData) return true;
        const now = Date.now();
        return now >= (this.tokenData?.expiredAt ?? 0);
    }

    /**
     * Clear stored token.
     */
    static clear(): void {
        this.tokenData = null;
    }

    /**
     * Inject Authorization header into existing headers (if token exists).
     */
    static async injectTokenHeader(
        headers: Record<string, string> = {}
    ): Promise<Record<string, string>> {
        const token = await this.get();
        if (!token) return headers;

        return {
            ...headers,
            Authorization: `Bearer ${token}`,
        };
    }
}
