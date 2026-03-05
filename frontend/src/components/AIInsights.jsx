// AIInsights.jsx — sends spending data to Flask, shows Claude's response
import { useState } from "react";

const QUICK = [
  "Where am I overspending?",
  "Give me saving tips",
  "Is my budget healthy?",
];

export default function AIInsights({ transactions, getInsight, loading }) {
  const [insight, setInsight] = useState(
    "Add a few transactions and click below to get personalized spending insights. ✨"
  );

  // Build summary to send to Flask backend
  function buildSummary() {
    const income  = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);

    const categories = {};
    transactions.filter(t => t.type === "expense").forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });

    return {
      income,
      expense,
      balance:  income - expense,
      categories,
      recent: transactions.slice(0, 8).map(t => `${t.desc} (${t.type}: ₹${t.amount}, ${t.category})`),
    };
  }

  async function ask(question) {
    if (transactions.length === 0) {
      setInsight("Add at least a few transactions first so I can analyze your spending! 📊");
      return;
    }
    setInsight("Thinking...");
    const result = await getInsight(question, buildSummary());
    setInsight(result || "Could not get a response. Check the backend.");
  }

  return (
    <div className="ai-box">
      <div className="ai-header">
        <div className="ai-dot" />
        <span>AI Insights</span>
      </div>

      <div className="ai-insight-text">{insight}</div>

      <div className="ai-chips">
        {QUICK.map(q => (
          <button key={q} className="ai-chip" onClick={() => ask(q)}>{q}</button>
        ))}
      </div>

      <button
        className="ai-btn"
        disabled={loading}
        onClick={() => ask("Give me a full spending analysis with 3 tips")}
      >
        {loading ? <><span className="ai-loading" /> Analyzing...</> : "✦ Analyze My Spending"}
      </button>
    </div>
  );
}
