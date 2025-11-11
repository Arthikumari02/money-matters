import { toast } from 'react-hot-toast';

export class ApiError extends Error {
    statusCode: number;
    details?: any;

    constructor(message: string, statusCode: number = 500, details?: any) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.details = details;
    }
}

export const handleApiError = (error: any, context: string = '') => {
    console.error(`${context ? `${context}: ` : ''}`, error);

    let errorMessage = 'An unexpected error occurred';
    let statusCode = 500;

    if (error instanceof ApiError) {
        errorMessage = error.message;
        statusCode = error.statusCode;
    } else if (error.response) {
        errorMessage = error.response.data?.message || error.response.statusText || 'Request failed';
        statusCode = error.response.status;
    } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    toast.error(`${context ? `${context}: ` : ''}${errorMessage}`, {
        duration: 5000,
        position: 'top-right',
    });

    return {
        message: errorMessage,
        statusCode,
        details: error instanceof ApiError ? error.details : undefined,
    };
};

export const withErrorHandling = async <T>(
    fn: () => Promise<T>,
    context: string = ''
): Promise<{ data?: T; error?: ReturnType<typeof handleApiError> }> => {
    try {
        const data = await fn();
        return { data };
    } catch (error) {
        const errorResult = handleApiError(error, context);
        return { error: errorResult };
    }
};
