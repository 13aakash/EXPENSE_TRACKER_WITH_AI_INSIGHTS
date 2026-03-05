// Custom hook — handles all API calls to Flask backend
import { useState, useEffect } from "react";

const API = "http://localhost:5000";

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all on mount
  useEffect(() => {
    fetch(`${API}/transactions`)
      .then(r => r.json())
      .then(setTransactions)
      .catch(() => {});
  }, []);

  async function addTransaction(txn) {
    const res  = await fetch(`${API}/transactions`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(txn),
    });
    const data = await res.json();
    setTransactions(prev => [data, ...prev]);
  }

  async function deleteTransaction(id) {
    await fetch(`${API}/transactions/${id}`, { method: "DELETE" });
    setTransactions(prev => prev.filter(t => t.id !== id));
  }

  async function getInsight(question, summary) {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/ai-insight`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ question, summary }),
      });
      const data = await res.json();
      return data.insight;
    } finally {
      setLoading(false);
    }
  }

  return { transactions, addTransaction, deleteTransaction, getInsight, loading };
}
