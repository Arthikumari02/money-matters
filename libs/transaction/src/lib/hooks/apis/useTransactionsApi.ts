import { useCallback, useEffect } from "react";
import axios from "axios";
import { TransactionsStore } from "../../stores/TransactionsStore";
import { TransactionModel, TransactionType } from "../../models/TransactionModel";

const API_BASE_URL = "https://bursting-gelding-24.hasura.app/api/rest";
const ADMIN_SECRET =
    "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF";

const getHeaders = (isAdmin: boolean, userId?: string) => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": ADMIN_SECRET,
        "x-hasura-role": isAdmin ? "admin" : "user",
    };
    if (!isAdmin && userId) headers["x-hasura-user-id"] = String(userId);
    return headers;
};

interface Options {
    autoFetch?: boolean;
    onSuccess?: () => void;
    onError?: (msg: string) => void;
}

export const useTransactionsApi = (
    store: TransactionsStore,
    options: Options = {}
) => {
    const { autoFetch = true, onSuccess, onError } = options;

    const fetchTransactions = useCallback(
        async (reset = false) => {
            const { isAdmin, userId, activeTab, offset, LIMIT } = store;
            if (!isAdmin && !userId) {
                console.error("Missing userId for non-admin user");
                return;
            }

            store.setLoading(true);
            store.setError(null);

            try {
                const headers = getHeaders(isAdmin, userId || undefined);
                const params: Record<string, any> = {
                    limit: LIMIT,
                    offset: reset ? 0 : offset,
                };
                if (activeTab !== "all") params.type = activeTab;

                const endpoint = isAdmin
                    ? `${API_BASE_URL}/all-transactions`
                    : `${API_BASE_URL}/transactions`;

                const res = await axios.get(endpoint, { headers, params });

                const transactionsArray = isAdmin
                    ? res.data?.all_transactions ?? []
                    : res.data?.transactions_by_user_id ?? [];

                const fetched = transactionsArray.map(
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
                            userAvatar: tx.user_avatar,
                        })
                );

                store.setTransactions(fetched, reset);
                store.setPagination(reset ? LIMIT : offset + LIMIT, fetched.length === LIMIT);
                onSuccess?.();
            } catch (err: any) {
                console.error("Error fetching transactions:", err);
                const msg = err?.message || "Failed to fetch transactions.";
                store.setError(msg);
                onError?.(msg);
            } finally {
                store.setLoading(false);
            }
        },
        [store, onSuccess, onError]
    );

    useEffect(() => {
        if (autoFetch) fetchTransactions(true);
    }, [fetchTransactions]);

    return {
        store,
        fetchTransactions,
        refresh: () => fetchTransactions(true),
        switchTab: (tab: "all" | "credit" | "debit") => {
            store.setActiveTab(tab);
            fetchTransactions(true);
        },
    };
};
