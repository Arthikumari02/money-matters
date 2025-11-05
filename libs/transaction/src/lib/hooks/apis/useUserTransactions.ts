import { useCallback, useEffect } from "react";
import axios from "axios";
import { TransactionModel, TransactionType } from "../../models/TransactionModel";
import { userTransactionStore } from "../../stores/UserTransactionStore";

const API_BASE_URL = "https://bursting-gelding-24.hasura.app/api/rest";

const getAuthHeaders = (userId: string | null) => ({
  "Content-Type": "application/json",
  "x-hasura-admin-secret":
    "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
  "x-hasura-role": "user",
  ...(userId ? { "x-hasura-user-id": userId } : {}),
});

export const useUserTransactionsApi = (userId: string | null) => {
  const fetchAllTransactions = useCallback(async () => {
    if (!userId) return;

    userTransactionStore.setLoading(true);
    userTransactionStore.setError(null);

    try {
      const headers = getAuthHeaders(userId);

      const response = await axios.get(`${API_BASE_URL}/all-transactions`, {
        headers,
        params: { limit: 10000, offset: 0 },
      });

      const data =
        response.data.transactions ?? response.data.all_transactions ?? [];

      const transactions = data.map(
        (tx: any) =>
          new TransactionModel({
            id: tx.id,
            name: tx.transaction_name ?? "Unnamed Transaction",
            amount: parseFloat(tx.amount ?? 0),
            type: (tx.type ?? "debit").toLowerCase() as TransactionType,
            category: tx.category ?? "Uncategorized",
            userId: tx.user_id,
            userName: tx.user_name ?? "Unknown",
            date: tx.date,
            createdAt: tx.created_at,
            updatedAt: tx.updated_at,
            userAvatar: tx.userAvatar,
          })
      );

      userTransactionStore.setTransactions(transactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      userTransactionStore.setError("Failed to load transactions.");
    } finally {
      userTransactionStore.setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) fetchAllTransactions();
  }, [userId]);

  return { store: userTransactionStore, fetchAllTransactions };
};
