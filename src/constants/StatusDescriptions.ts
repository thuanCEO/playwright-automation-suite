export const StatusDescriptions: Record<number, string> = {
    200: 'The request has succeeded.',
    201: 'The resource has been created successfully.',
    202: 'The request has been accepted for processing.',
    204: 'The server successfully processed the request and is not returning any content.',

    400: 'The request could not be understood by the server due to malformed syntax.',
    401: 'Authentication is required and has failed or has not been provided.',
    403: 'The server understood the request, but refuses to authorize it.',
    404: 'The requested resource could not be found.',
    405: 'The request method is not supported for the requested resource.',
    409: 'The request could not be completed due to a conflict with the current state.',
    422: 'The request was well-formed but was unable to be followed due to semantic errors.',

    500: 'The server encountered an unexpected condition.',
    501: 'The server does not support the functionality required to fulfill the request.',
    502: 'The server received an invalid response from the upstream server.',
    503: 'The server is currently unable to handle the request due to temporary overload.',
    504: 'The server did not receive a timely response from the upstream server.',
};
