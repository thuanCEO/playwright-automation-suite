import { TokenTypeEnums } from '@enums/TokenTypeEnum';
/**
 * Represents a complete token object used for authentication.
 */
export interface ITokenData {
    /** Access token string (e.g., JWT or opaque token) */
    token: string;

    /** Optional refresh token for renewing the access token */
    refreshToken?: string;

    /** Expiration timestamp in milliseconds (UNIX format) */
    expiredAt?: number;

    /** Timestamp when the token was issued (UNIX format) */
    issuedAt?: number;

    /** Type of token, e.g., 'Bearer' */
    tokenType?: TokenTypeEnums;

    /** List of scopes or permissions granted */
    scope?: string[];

    /** Unique user ID associated with the token */
    userId?: string;

    /** Username or login identifier of the token owner */
    username?: string;

    /** Roles assigned to the token user (for role-based testing) */
    roles?: string[];

    /** Tenant ID for multi-tenant environments */
    tenantId?: string;

    /** OAuth2 client or application ID */
    clientId?: string;

    /** Optional metadata for internal tracking or debugging */
    metadata?: Record<string, any>;
}
