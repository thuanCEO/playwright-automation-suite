export const StatusContexts: Record<number, string> = {
    200: 'Standard success response',
    201: 'Resource successfully created',
    202: 'Request accepted and queued',
    204: 'No additional content returned',

    400: 'Malformed request syntax',
    401: 'Token expired or invalid',
    403: 'User does not have permission',
    404: 'Requested resource does not exist',
    405: 'Method is not allowed on this route',
    409: 'Data conflict during processing',
    422: 'Validation failed. One or more fields are missing, invalid, or do not meet business rules.',

    500: 'Something went wrong on the server',
    501: 'Functionality not implemented on server',
    502: 'Upstream server returned invalid response',
    503: 'Server overloaded or down for maintenance',
    504: 'No response from upstream server in time',
};
