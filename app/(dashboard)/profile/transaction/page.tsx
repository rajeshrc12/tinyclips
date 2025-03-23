"use client";

import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { Transaction } from "@prisma/client";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const TransactionsTable = () => {
  const [page, setPage] = useState(1);
  const limit = 5; // Number of transactions per page

  // Fetch transactions with pagination
  const { data, error, isLoading } = useSWR(`/api/transaction?page=${page}&limit=${limit}`, fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading transactions</p>;

  const { transactions, total } = data || { transactions: [], total: 0 };
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Transaction ID</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Currency</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {transactions.map((tx: Transaction) => (
              <tr key={tx.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{tx.id}</td>
                <td className="py-3 px-6 font-bold text-green-600">₹{tx.amount}</td>
                <td className="py-3 px-6">{tx.currency}</td>
                <td className={`py-3 px-6 ${tx.status === "successful" ? "text-green-600" : "text-red-600"}`}>{tx.status}</td>
                <td className="py-3 px-6">{new Date(tx.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
          Previous
        </button>

        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))} disabled={page >= totalPages} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
