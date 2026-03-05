// SummaryCards.jsx — shows Income, Expense, Balance at the top
export default function SummaryCards({ transactions }) {
  const income  = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;
  const savings = income > 0 ? Math.round((balance / income) * 100) : 0;

  const fmt = n => "₹" + n.toLocaleString("en-IN");

  return (
    <div className="summary">
      <div className="sum-card income">
        <div className="sum-label">💰 Total Income</div>
        <div className="sum-val green">{fmt(income)}</div>
        <div className="sum-count">{transactions.filter(t => t.type === "income").length} transactions</div>
      </div>
      <div className="sum-card expense">
        <div className="sum-label">💸 Total Spent</div>
        <div className="sum-val red">{fmt(expense)}</div>
        <div className="sum-count">{transactions.filter(t => t.type === "expense").length} transactions</div>
      </div>
      <div className="sum-card balance">
        <div className="sum-label">📊 Balance</div>
        <div className={`sum-val ${balance >= 0 ? "blue" : "red"}`}>{fmt(balance)}</div>
        <div className="sum-count">Savings rate: {savings}%</div>
      </div>
    </div>
  );
}
