import axios from 'axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginApi = async ({ email, password }: LoginPayload) => {
  return axios.post(
    'https://bursting-gelding-24.hasura.app/api/rest/get-user-id',
    { email, password },
    {
      headers: {
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'content-type': 'application/json',
      },
    }
  );
};

export default loginApi;
