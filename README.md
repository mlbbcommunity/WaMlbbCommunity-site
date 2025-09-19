# WaMlbb Community — Demo Website Scaffold

This repository contains a frontend (React + Vite + Tailwind + Framer Motion)
and a backend (Node.js + Express) that uses PostgreSQL for storing events and site content.

**What you get**
- Animated, responsive React frontend with sample pages (Home, Bots, Heroes).
- Express API with CRUD endpoints for `events` and `news` backed by PostgreSQL.
- Webhook/API endpoint for your WhatsApp bot to update event/news data.
- Animations for the main site title and interactive UI components.
- Deploy instructions for Render.

---

## Quick start (local)

### Requirements
- Node 18+
- PostgreSQL (local or cloud)
- npm or yarn

### Backend
```bash
cd backend
cp .env.example .env
# fill in DATABASE_URL (Postgres connection string) and PORT
npm install
# run DB migration SQL to create tables
psql "$DATABASE_URL" -f migrations/create_tables.sql
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
# set VITE_API_URL to your backend URL (http://localhost:4000 by default)
npm install
npm run dev
```

### WhatsApp bot integration
- Use the backend API endpoints (`POST /api/webhook/events` or `/api/webhook/news`) to update site data.
- Protect webhook endpoints with a shared secret (set `WEBHOOK_SECRET` in backend .env).

---

## Deploying to Render
- Create two services: one Web Service for backend (Node), one Static Site for frontend (build).
- Set environment variables on Render: `DATABASE_URL`, `WEBHOOK_SECRET`, etc.
- Build the frontend and point Static Site to `frontend/dist`.
- Point the frontend `VITE_API_URL` to your backend service URL.

---

## Where to start editing
- Frontend: `frontend/src` (React components)
- Backend: `backend/server.js`, `backend/db.js`, `backend/routes/events.js`
- DB schema: `backend/migrations/create_tables.sql`

Enjoy — this scaffold is a starting point. Customize styles, animations, and bot commands as you like.
