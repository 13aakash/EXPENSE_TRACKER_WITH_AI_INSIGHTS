// App.jsx — root component, ties all pieces together
import SummaryCards      from "./components/SummaryCards";
import AddTransaction    from "./components/AddTransaction";
import TransactionList   from "./components/TransactionList";
import CategoryBreakdown from "./components/CategoryBreakdown";
import AIInsights        from "./components/AIInsights";
import useTransactions   from "./hooks/useTransactions";
import "./index.css";

export default function App() {
  const { transactions, addTransaction, deleteTransaction, getInsight, loading } = useTransactions();

  const now = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div className="wrap">
      {/* Header */}
      <header>
        <div className="brand">
          <h1>Spend<span>Smart</span></h1>
          <p>Personal Finance Tracker</p>
        </div>
        <div className="month-badge">{now}</div>
      </header>

      {/* Summary */}
      <SummaryCards transactions={transactions} />

      {/* Add form */}
      <AddTransaction onAdd={addTransaction} />

      {/* Main grid */}
      <div className="main-grid">
        <TransactionList transactions={transactions} onDelete={deleteTransaction} />

        <div className="right-panel">
          <CategoryBreakdown transactions={transactions} />
          <AIInsights
            transactions={transactions}
            getInsight={getInsight}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
