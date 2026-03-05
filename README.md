# 💸 Spendly — AI-Powered Expense Tracker

## 🧠 Tech Stack
| Layer | Technology | Purpose |
|---|---|---|
| Backend | Python, Flask | REST API |
| Database | SQLite | Store expenses & budgets |
| AI | Anthropic Claude API | Spending insights & tips |
| Charts | Chart.js | Bar + Doughnut charts |
| Frontend | HTML, CSS, Vanilla JS | Single-page UI |

---

## 📁 Project Structure
```
expense-tracker/
├── backend/
│   ├── app.py              # Flask REST API + SQLite + Claude
│   ├── requirements.txt
│   └── Procfile
└── frontend/
    └── index.html          # Full SPA
```

---

## 🚀 LOCAL SETUP

### Step 1 — Backend
```bash
cd expense-tracker/backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
export ANTHROPIC_API_KEY=your_key_here
python app.py
# → Running on http://localhost:5001
```

### Step 2 — Frontend
Open `frontend/index.html` in browser directly, or:
```bash
cd ../frontend
python -m http.server 3000
```

---

## 🌐 HOSTING

### Option A — Render.com (FREE)

**Backend:**
1. Push to GitHub
2. Render → New Web Service → connect repo
3. Root Directory: `backend`
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `gunicorn app:app`
6. Add env var: `ANTHROPIC_API_KEY`
7. Deploy → copy URL e.g. `https://spendly-api.onrender.com`

**Frontend:**
1. In `frontend/index.html`, update:
   `const BACKEND = "https://spendly-api.onrender.com";`
2. Render → New Static Site → root: `frontend`
3. Deploy

### Option B — Railway.app
Same steps as Render above. Railway auto-detects Flask.

### Option C — Vercel (Frontend) + Render (Backend)
- Deploy frontend on Vercel (drag & drop `frontend/` folder)
- Deploy backend on Render
- Update `BACKEND` URL in index.html

---

## 📝 Resume Bullet Points
```
• Built a full-stack AI Expense Tracker with Flask REST API, SQLite database,
  and Claude AI integration for personalized financial insights and savings recommendations

• Designed interactive dashboard with Chart.js (bar + doughnut charts),
  budget tracking with visual progress indicators, and monthly analytics

• Implemented CRUD operations for expenses and budgets via RESTful endpoints,
  deployed on Render with environment-based API key management
```

---

## 🔑 API Endpoints
| Method | Route | Description |
|---|---|---|
| GET | /expenses?month= | List expenses by month |
| POST | /expenses | Add new expense |
| DELETE | /expenses/:id | Delete expense |
| GET | /budgets?month= | Get budgets |
| POST | /budgets | Set/update budget |
| GET | /analytics?month= | Category totals + daily data |
| POST | /ai-insights | Claude AI analysis |
| GET | /health | Health check |
