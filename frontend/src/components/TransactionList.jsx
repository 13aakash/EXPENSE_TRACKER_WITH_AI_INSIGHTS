// TransactionList.jsx — shows all transactions with filter
import { useState } from "react";

const CAT_META = {
  Food:          { color: "#e67e22", icon: "🍔" },
  Transport:     { color: "#3498db", icon: "🚌" },
  Shopping:      { color: "#9b59b6", icon: "🛍️" },
  Entertainment: { color: "#e91e8c", icon: "🎬" },
  Health:        { color: "#27ae60", icon: "💊" },
  Bills:         { color: "#e74c3c", icon: "⚡" },
  Salary:        { color: "#2ecc71", icon: "💼" },
  Other:         { color: "#95a5a6", icon: "📦" },
};

export default function TransactionList({ transactions, onDelete }) {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? transactions
    : transactions.filter(t => t.type === filter);

  return (
    <div className="transactions">
      <div className="section-head">
        <h3>Transactions</h3>
        <div className="filter-row">
          {["all", "expense", "income"].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="txn-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="emoji">📝</div>
            <p>No transactions yet.<br />Add your first one above!</p>
          </div>
        ) : (
          filtered.map(t => {
            const meta = CAT_META[t.category] || CAT_META["Other"];
            return (
              <div className="txn-item" key={t.id}>
                <div className="txn-icon" style={{ background: meta.color + "22" }}>
                  {meta.icon}
                </div>
                <div className="txn-info">
                  <div className="txn-name">{t.desc}</div>
                  <div className="txn-meta">{t.category} · {t.date}</div>
                </div>
                <div className={`txn-amount ${t.type === "income" ? "pos" : "neg"}`}>
                  {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
                </div>
                <button className="del-btn" onClick={() => onDelete(t.id)}>✕</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
