export const StatusCategories: Record<number, 'SUCCESS' | 'CLIENT_ERROR' | 'SERVER_ERROR'> = {
    200: 'SUCCESS',
    201: 'SUCCESS',
    202: 'SUCCESS',
    204: 'SUCCESS',

    400: 'CLIENT_ERROR',
    401: 'CLIENT_ERROR',
    403: 'CLIENT_ERROR',
    404: 'CLIENT_ERROR',
    405: 'CLIENT_ERROR',
    409: 'CLIENT_ERROR',
    422: 'CLIENT_ERROR',

    500: 'SERVER_ERROR',
    501: 'SERVER_ERROR',
    502: 'SERVER_ERROR',
    503: 'SERVER_ERROR',
    504: 'SERVER_ERROR',
};
