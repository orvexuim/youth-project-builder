# 🚀 Youth Project Builder

**AI-powered platform that transforms any startup idea into a complete business kit in under 5 minutes.**

Built for hackathons, students, young entrepreneurs, and first-time founders.

---

## ✨ Features

| Step | AI Output |
|------|-----------|
| 1 | 💡 Idea Input |
| 2 | 🔍 Business Analysis (name, slogan, UVP, SWOT, competitors) |
| 3 | 🎨 Brand Identity (colors, typography, logo concept) |
| 4 | 📋 Business Plan (milestones, budget, risks, roadmap) |
| 5 | 📱 Marketing Content (bios, 20 ideas, 10 captions, hashtags) |
| 6 | 🌐 Website Copy (hero, features, FAQ, SEO) |
| 7 | 📊 Pitch Deck (10 slides with speaker notes) |
| 8 | 🗺️ Action Roadmap (Week 1 → Year 1) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS + Framer Motion |
| Backend | Python Flask + JWT Auth |
| Database | SQLite |
| AI | OpenAI GPT-4o |
| State | Zustand |

---

## 🚀 Quick Start

### Backend
```bash
cd backend
cp .env.example .env
# Add your OPENAI_API_KEY to .env
pip install -r requirements.txt
python app.py
# → Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# → Runs on http://localhost:3000
```

---

## 📁 Project Structure

```
youth-project-builder/
├── backend/
│   ├── app.py                  # Flask factory
│   ├── database.py             # SQLite schema + init
│   ├── requirements.txt
│   ├── routes/
│   │   ├── auth.py             # Register, Login, JWT
│   │   ├── projects.py         # CRUD projects
│   │   └── generate.py         # AI generation steps 2-8
│   └── services/
│       └── ai_service.py       # GPT-4o prompts engine
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── GeneratorPage.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   └── PricingPage.jsx
│   │   ├── components/
│   │   │   ├── layout/Navbar.jsx
│   │   │   └── generator/
│   │   │       ├── Step2Result.jsx   # Business Analysis
│   │   │       ├── Step3Result.jsx   # Brand Identity
│   │   │       ├── Step4Result.jsx   # Business Plan
│   │   │       ├── Step5Result.jsx   # Marketing Content
│   │   │       ├── Step6Result.jsx   # Website Copy
│   │   │       ├── Step7Result.jsx   # Pitch Deck
│   │   │       └── Step8Result.jsx   # Action Roadmap
│   │   ├── store/authStore.js
│   │   └── lib/api.js
│   └── package.json
└── docs/
    └── ARCHITECTURE.md
```

---

## 🌍 API Endpoints

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

POST /api/projects/
GET  /api/projects/
GET  /api/projects/:id
DELETE /api/projects/:id

POST /api/generate/step2/:id  → Business Analysis
POST /api/generate/step3/:id  → Brand Identity
POST /api/generate/step4/:id  → Business Plan
POST /api/generate/step5/:id  → Marketing Content
POST /api/generate/step6/:id  → Website Copy
POST /api/generate/step7/:id  → Pitch Deck
POST /api/generate/step8/:id  → Action Roadmap
```

---

## 💰 Pricing

| Plan | Price | Projects | Exports |
|------|-------|----------|---------|
| Free | $0 | 2 | PDF |
| Pro  | $19/mo | Unlimited | All formats |
| Team | $49/mo | Unlimited | API access |

---

## 🏆 Built for Hackathons

This project was built as a hackathon entry to demonstrate how AI can democratize entrepreneurship for young people worldwide.

---

## 📄 License

MIT — free to use, modify, and distribute.
