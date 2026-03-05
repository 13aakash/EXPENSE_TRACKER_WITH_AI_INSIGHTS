from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os

app = Flask(__name__)
CORS(app)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# In-memory store (swap with SQLite/PostgreSQL for production)
transactions = []
next_id = 1


@app.route("/transactions", methods=["GET"])
def get_transactions():
    return jsonify(transactions)


@app.route("/transactions", methods=["POST"])
def add_transaction():
    global next_id
    data = request.json

    if not data.get("desc") or not data.get("amount") or not data.get("type"):
        return jsonify({"error": "desc, amount, and type are required"}), 400

    txn = {
        "id":       next_id,
        "desc":     data["desc"],
        "amount":   float(data["amount"]),
        "category": data.get("category", "Other"),
        "type":     data["type"],
        "date":     data.get("date", ""),
    }

    transactions.append(txn)
    next_id += 1
    return jsonify(txn), 201


@app.route("/transactions/<int:txn_id>", methods=["DELETE"])
def delete_transaction(txn_id):
    global transactions
    transactions = [t for t in transactions if t["id"] != txn_id]
    return jsonify({"message": "Deleted"}), 200


@app.route("/ai-insight", methods=["POST"])
def ai_insight():
    data     = request.json
    question = data.get("question", "Give me a full spending analysis with 3 tips")
    summary  = data.get("summary", {})

    prompt = f"""
User's financial data:
- Total Income:   ₹{summary.get('income', 0)}
- Total Expenses: ₹{summary.get('expense', 0)}
- Balance:        ₹{summary.get('balance', 0)}
- Category breakdown: {summary.get('categories', {})}
- Recent transactions: {summary.get('recent', [])}

Question: {question}

Give a short, friendly, helpful response in 2-3 sentences. Use 1-2 emojis. Be specific with numbers. No markdown.
"""

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=200,
        messages=[{"role": "user", "content": prompt}]
    )

    return jsonify({"insight": message.content[0].text})


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
