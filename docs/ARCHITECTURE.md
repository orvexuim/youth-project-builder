# Youth Project Builder — Complete Architecture

## 🎯 Product Vision
An AI-powered platform that transforms a simple idea into a complete startup kit
in under 5 minutes. Designed for young entrepreneurs, hackathon participants,
students, and first-time founders.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                          │
│   Home · Dashboard · Generator · Projects · Pricing · Auth     │
└──────────────────────────┬──────────────────────────────────────┘
                           │ REST API (JSON)
┌──────────────────────────▼──────────────────────────────────────┐
│                    API LAYER (Flask)                            │
│  JWT Auth · Rate Limiting · Input Validation · Error Handling  │
└──────┬──────────────┬──────────────────┬──────────────┬─────────┘
       │              │                  │              │
  ┌────▼────┐   ┌─────▼──────┐   ┌──────▼─────┐  ┌───▼──────┐
  │   AI    │   │   Users    │   │  Projects  │  │ Payments │
  │ Service │   │  Service   │   │  Service   │  │ Service  │
  │ GPT-4o  │   │  JWT/Auth  │   │   CRUD     │  │  Stripe  │
  └─────────┘   └────────────┘   └────────────┘  └──────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                    DATA LAYER (SQLite)                          │
│          users · projects · generations · exports              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

### users
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  password_hash TEXT,
  plan TEXT DEFAULT 'free',        -- free | pro | team
  generations_today INTEGER DEFAULT 0,
  last_reset_date TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### projects
```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL,
  idea TEXT NOT NULL,
  status TEXT DEFAULT 'draft',     -- draft | complete | exported
  -- Step results stored as JSON
  business_analysis TEXT,          -- Step 2 JSON
  brand_identity TEXT,             -- Step 3 JSON
  business_plan TEXT,              -- Step 4 JSON
  marketing_content TEXT,          -- Step 5 JSON
  website_copy TEXT,               -- Step 6 JSON
  pitch_deck TEXT,                 -- Step 7 JSON
  action_roadmap TEXT,             -- Step 8 JSON
  current_step INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### generations
```sql
CREATE TABLE generations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  project_id INTEGER REFERENCES projects(id),
  step INTEGER,                    -- 1-8
  step_name TEXT,
  tokens_used INTEGER,
  generation_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🤖 AI Workflow (8 Steps)

```
Step 1: Idea Input (user writes)
    ↓
Step 2: Business Analysis    → GPT-4o → JSON {name, slogan, UVP, SWOT...}
    ↓
Step 3: Brand Identity       → GPT-4o → JSON {colors, fonts, personality...}
    ↓
Step 4: Business Plan        → GPT-4o → JSON {exec_summary, milestones...}
    ↓
Step 5: Marketing Content    → GPT-4o → JSON {bios, captions, hashtags...}
    ↓
Step 6: Website Copy         → GPT-4o → JSON {hero, features, cta...}
    ↓
Step 7: Pitch Deck           → GPT-4o → JSON {slides array...}
    ↓
Step 8: Action Roadmap       → GPT-4o → JSON {week1, month1, year1...}
```

---

## 💰 Monetization

| Plan  | Price   | Projects | AI Steps | Exports |
|-------|---------|----------|----------|---------|
| Free  | $0/mo   | 2        | All 8    | PDF only|
| Pro   | $19/mo  | Unlimited| All 8    | All formats|
| Team  | $49/mo  | Unlimited| All 8    | API access|

---

## 📡 API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

POST   /api/projects/                → Create project
GET    /api/projects/                → List projects
GET    /api/projects/:id             → Get project
DELETE /api/projects/:id             → Delete

POST   /api/generate/step2/:id       → Business analysis
POST   /api/generate/step3/:id       → Brand identity
POST   /api/generate/step4/:id       → Business plan
POST   /api/generate/step5/:id       → Marketing content
POST   /api/generate/step6/:id       → Website copy
POST   /api/generate/step7/:id       → Pitch deck
POST   /api/generate/step8/:id       → Action roadmap

GET    /api/health
```
