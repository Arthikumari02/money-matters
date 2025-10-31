interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface TransactionsResponse {
  transactions: any[];
  total: number;
}

interface DailyTotalsResponse {
  daywiseTotals: Array<{
    date: string;
    credit: number;
    debit: number;
  }>;
}

// Mock implementations - replace with actual API calls
export const fetchRecentTransactions = async (
  limit: number,
  offset: number,
  isAdmin: boolean,
  userId?: string
): Promise<TransactionsResponse> => {
  // Replace with actual API call
  return {
    transactions: [],
    total: 0,
  };
};

export const fetchDailyTotalsAdmin = async (): Promise<DailyTotalsResponse> => {
  // Replace with actual API call
  return {
    daywiseTotals: []
  };
};

export const fetchDailyTotalsUser = async (userId: string): Promise<DailyTotalsResponse> => {
  // Replace with actual API call
  return {
    daywiseTotals: []
  };
};

export const fetchTotalCreditsDebitsAdmin = async () => {
  // Replace with actual API call
  return { credit: 0, debit: 0 };
};

export const fetchTotalCreditsDebitsUser = async (userId: string) => {
  // Replace with actual API call
  return { credit: 0, debit: 0 };
};
