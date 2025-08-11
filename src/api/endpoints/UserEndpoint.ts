export const UserEndpoint = {
    users: {
        base: '/api/v2/user',
        byId: (id: string) => `/api/v2/user/${id}`,
    }
};