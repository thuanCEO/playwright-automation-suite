import { HttpClient } from '@api/core/HttpClient';
import { UserEndpoint } from '@api/endpoints/UserEndpoint';
import { IUser } from '@api/interface/IUser';
import { IHttpRequestOptions } from '@interfaces/IHttpRequestOptions';
import { APIResponse } from '@playwright/test';
import { Logger } from '@utils/LoggerUtils';

export class UserService {
    static async getAll(options?: IHttpRequestOptions): Promise<APIResponse> {
        Logger.info('[UserService] 📥 Fetching all users');
        return await HttpClient.get(UserEndpoint.users.base, options);
    }

    static async getById(userId: string, options?: IHttpRequestOptions): Promise<APIResponse> {
        Logger.info(`[UserService] 🔍 Fetching user by ID: ${userId}`);
        return await HttpClient.get(UserEndpoint.users.byId(userId), options);
    }

    static async create(data: Partial<IUser>, options?: IHttpRequestOptions): Promise<APIResponse> {
        Logger.info(`[UserService] ➕ Creating user with data: ${JSON.stringify(data)}`);
        return await HttpClient.post(UserEndpoint.users.base, {
            ...options,
            body: data,
        });
    }

    static async update(userId: string, data: Partial<IUser>, options?: IHttpRequestOptions): Promise<APIResponse> {
        Logger.info(`[UserService] ✏️ Updating user ID ${userId} with data: ${JSON.stringify(data)}`);
        return await HttpClient.put(UserEndpoint.users.byId(userId), {
            ...options,
            body: data,
        });
    }

    static async delete(userId: string, options?: IHttpRequestOptions): Promise<APIResponse> {
        Logger.info(`[UserService] 🗑️ Deleting user with ID: ${userId}`);
        return await HttpClient.delete(UserEndpoint.users.byId(userId), options);
    }
}
