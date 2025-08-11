export const StatusSeverities: Record<number, 'info' | 'warning' | 'critical'> = {
    200: 'info',
    201: 'info',
    202: 'info',
    204: 'info',

    400: 'warning',
    401: 'warning',
    403: 'warning',
    404: 'warning',
    405: 'warning',
    409: 'warning',
    422: 'warning',

    500: 'critical',
    501: 'critical',
    502: 'critical',
    503: 'critical',
    504: 'critical',
};
