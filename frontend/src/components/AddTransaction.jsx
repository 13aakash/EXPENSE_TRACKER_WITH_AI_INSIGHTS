// AddTransaction.jsx — form to add income/expense
import { useState } from "react";

const CATEGORIES = ["Food", "Transport", "Shopping", "Entertainment", "Health", "Bills", "Salary", "Other"];
const CAT_ICONS  = { Food:"🍔", Transport:"🚌", Shopping:"🛍️", Entertainment:"🎬", Health:"💊", Bills:"⚡", Salary:"💼", Other:"📦" };

export default function AddTransaction({ onAdd }) {
  const [type,     setType]     = useState("expense");
  const [desc,     setDesc]     = useState("");
  const [amount,   setAmount]   = useState("");
  const [category, setCategory] = useState("Food");

  function handleSubmit() {
    if (!desc.trim())       return alert("Enter a description");
    if (!amount || +amount <= 0) return alert("Enter a valid amount");

    onAdd({
      desc,
      amount: parseFloat(amount),
      category,
      type,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    });

    setDesc("");
    setAmount("");
  }

  return (
    <div className="add-form">
      <div className="form-title">＋ Add Transaction</div>

      {/* Type toggle */}
      <div className="type-toggle">
        <button
          className={`toggle-btn ${type === "expense" ? "active exp" : ""}`}
          onClick={() => { setType("expense"); setCategory("Food"); }}
        >🔴 Expense</button>
        <button
          className={`toggle-btn ${type === "income" ? "active inc" : ""}`}
          onClick={() => { setType("income"); setCategory("Salary"); }}
        >🟢 Income</button>
      </div>

      <div className="form-row">
        <div className="field">
          <label>Description</label>
          <input
            value={desc}
            onChange={e => setDesc(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="e.g. Zomato lunch"
          />
        </div>
        <div className="field">
          <label>Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="500"
            min="1"
          />
        </div>
        <div className="field">
          <label>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{CAT_ICONS[c]} {c}</option>
            ))}
          </select>
        </div>
        <button className="add-btn" onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
}
