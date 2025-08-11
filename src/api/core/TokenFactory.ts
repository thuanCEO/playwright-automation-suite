import { ITokenData } from '@interfaces/ITokenData';
import { TokenTypeEnums } from '@enums/TokenTypeEnum';

export class TokenFactory {
    /**
     * Generate ITokenData with default values, allowing field overrides.
     *
     * @param userType Role or identifier (e.g. 'admin', 'tester')
     * @param overrides Partial data to override any token field
     */
    static create(userType: string, overrides: Partial<ITokenData> = {}): ITokenData {
        const now = Date.now();

        const base: ITokenData = {
            token: overrides.token ?? `mocked-token-${userType}`,
            refreshToken: overrides.refreshToken ?? `refresh-token-${userType}`,
            issuedAt: overrides.issuedAt ?? now,
            expiredAt: overrides.expiredAt ?? now + 60 * 60 * 1000,
            tokenType: overrides.tokenType ?? TokenTypeEnums.Bearer,
            scope: overrides.scope ?? ['read'],
            userId: overrides.userId ?? `${userType}`,
            username: overrides.username ?? `${userType}`,
            roles: overrides.roles ?? [userType],
            ...overrides,
        };

        return base;
    }
}
