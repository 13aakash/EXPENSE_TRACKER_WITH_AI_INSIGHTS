// CategoryBreakdown.jsx — shows spending by category with bars
import { useEffect, useRef } from "react";

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

export default function CategoryBreakdown({ transactions }) {
  const barsRef = useRef(null);

  const expenses = transactions.filter(t => t.type === "expense");

  // Group by category
  const totals = {};
  expenses.forEach(t => {
    totals[t.category] = (totals[t.category] || 0) + t.amount;
  });

  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const max    = sorted[0]?.[1] || 1;

  // Animate bars after render
  useEffect(() => {
    const bars = barsRef.current?.querySelectorAll(".cat-bar-fill");
    if (!bars) return;
    setTimeout(() => {
      bars.forEach(el => { el.style.width = el.dataset.width + "%"; });
    }, 50);
  }, [transactions]);

  return (
    <div className="breakdown">
      <div className="section-head" style={{ padding: "0 0 14px", borderBottom: "1px solid var(--border)", marginBottom: "16px" }}>
        <h3>By Category</h3>
      </div>

      {sorted.length === 0 ? (
        <p style={{ fontSize: "12px", color: "var(--muted)", textAlign: "center", padding: "16px 0" }}>
          Add expenses to see breakdown
        </p>
      ) : (
        <div ref={barsRef}>
          {sorted.map(([cat, amt]) => {
            const meta = CAT_META[cat] || CAT_META["Other"];
            const pct  = Math.round((amt / max) * 100);
            return (
              <div className="cat-item" key={cat}>
                <div className="cat-row">
                  <div className="cat-name">{meta.icon} {cat}</div>
                  <div className="cat-amt">₹{amt.toLocaleString("en-IN")}</div>
                </div>
                <div className="cat-bar-track">
                  <div
                    className="cat-bar-fill"
                    style={{ background: meta.color, width: 0 }}
                    data-width={pct}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
