import { ApiError, withErrorHandling } from "../utils/errorHandler";

const API_BASE_URL = 'https://bursting-gelding-24.hasura.app/api/rest';
const ADMIN_SECRET = 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF';

const handleApiResponse = async (response: Response, context: string) => {
    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (_e) {
            errorData = { message: response.statusText };
        }
        throw new ApiError(
            errorData.message || 'Request failed',
            response.status,
            errorData
        );
    }
    return response.json();
};

const deleteTransaction = async ({
    transactionId,
    userId,
}: {
    transactionId: string;
    userId: string;
}): Promise<void> => {
    const response = await withErrorHandling(
        async () => {
            const res = await fetch(
                `${API_BASE_URL}/delete-transaction?id=${transactionId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-hasura-admin-secret': ADMIN_SECRET,
                        'x-hasura-role': 'user',
                        'x-hasura-user-id': userId,
                    },
                }
            );
            return handleApiResponse(res, 'deleteTransaction');
        },
        'Failed to delete transaction'
    );

    if (response.error) throw response.error;
};

export default deleteTransaction;
