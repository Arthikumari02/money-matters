export const fetchTotalCreditsDebitsAdmin = async () => {
  const res = await fetch(
    'https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin',
    {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'admin',
      },
    }
  );
  return res.json();
};

export const fetchDailyTotalsAdmin = async () => {
  const res = await fetch(
    'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin',
    {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'admin',
      },
    }
  );
  return res.json();
};
export const fetchTotalCreditsDebitsUser = async (userId: string) => {
  const res = await fetch(
    'https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals',
    {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': userId,
      },
    }
  );
  return res.json();
};

export const fetchDailyTotalsUser = async (userId: string) => {
  const res = await fetch(
    'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days',
    {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': userId,
      },
    }
  );
  return res.json();
};

export const fetchRecentTransactions = async (
  limit = 3,
  offset = 0,
  isAdmin = false,
  userId?: string
) => {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'x-hasura-admin-secret':
      'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
  };

  // Assign correct Hasura role
  if (isAdmin) {
    headers['x-hasura-role'] = 'admin';
  } else {
    headers['x-hasura-role'] = 'user';
    if (userId) {
      headers['x-hasura-user-id'] = userId;
    }
  }

  const res = await fetch(
    `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${limit}&offset=${offset}`,
    { headers }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch recent transactions (${res.status})`);
  }

  const data = await res.json();

  const sorted = (data.transactions || []).sort(
    (a: any, b: any) =>
      new Date(b.timestamp || b.date).getTime() -
      new Date(a.timestamp || a.date).getTime()
  );

  return {
    ...data,
    transactions: sorted.slice(0, limit),
  };
};
