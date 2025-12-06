# 🔗 TinyLink – Production-Ready URL Shortener

> Minimal URL shortener with custom codes, click tracking, stats dashboard, and delete functionality (Next.js 16 + Neon PostgreSQL + Prisma)

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Neon](https://img.shields.io/badge/Neon_DB-00E599?style=for-the-badge&logo=neondatabase&logoColor=white)](https://neon.tech/)
[![Prisma](https://img.shields.io/badge/Prisma-3F37C9?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**Live Demo:** [https://tiny-link-harsh.vercel.app/](https://tiny-link-harsh.vercel.app/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Project Structure](#architecture--project-structure)
- [Installation & Setup](#installation--setup)
- [API Overview](#api-overview)
- [Frontend Flows](#frontend-flows)
- [Environment Configuration](#environment-configuration)
- [Author](#author)

---

## 🎯 Overview

**TinyLink** is a production-ready URL shortener built for a take-home assignment, featuring:

- Custom short codes with duplicate protection
- Click tracking with timestamps
- Stats dashboard per link (`/code/:code`)
- Delete functionality
- Clean, responsive dashboard UI
- Deployed on Vercel with Neon PostgreSQL

Demonstrates Next.js 16 App Router, Prisma ORM, and full-stack TypeScript patterns.

---

## ✨ Features

### 🔗 Core URL Shortening

- **Shorten any URL** → `tiny.link/abc123`
- **Custom codes** (e.g., `tiny.link/mylink`)
- **Duplicate protection** – rejects existing codes
- **HTTP 302 redirects** with click counting
- **Last clicked timestamp** tracking

### 📊 Analytics & Management

- **Stats page** `/code/abc123` shows total clicks + timestamps
- **Delete links** from dashboard
- **List all your links** with click counts
- **Inline form validation** + loading states
- **Copy-to-clipboard** buttons

### 🎨 UI/UX

- Responsive dashboard design
- Real-time validation feedback
- Clean table with sortable clicks
- Error handling + success states
- Health check endpoint `/healthz`

---

## 🛠️ Tech Stack

| Layer     | Technologies                                      |
|-----------|---------------------------------------------------|
| Framework | Next.js 16 (App Router), TypeScript               |
| Database  | Neon PostgreSQL, Prisma ORM                       |
| UI        | Tailwind CSS, React Hook Form, Zod validation     |
| Deployment| Vercel (serverless), Neon (serverless Postgres)   |
| Dev Tools | ESLint, Prettier, Prisma Studio, GitHub           |

---

## 🧱 Architecture & Project Structure

tiny-link/
├── app/                   # Next.js 16 App Router
│   ├── api/links/         # API routes (POST, GET, DELETE)
│   │   └── [code]/        # Stats + delete
│   ├── code/[code]/       # Stats page
│   ├── page.tsx           # Dashboard
│   ├── healthz/           # Health check
│   └── not-found.tsx
├── lib/
│   └── prisma.ts          # Prisma client
├── prisma/
│   └── schema.prisma      # Link model (code, url, clicks, timestamps)
├── .env                   # DATABASE_URL
└── tailwind.config.js


---

## 🚀 Installation & Setup

### ✅ Prerequisites

- Node.js **v18+** (LTS)
- [Neon PostgreSQL](https://neon.tech) account
- npm or yarn

---

### 1️⃣ Clone the repo

git clone https://github.com/Harsh427744/tiny-link.git
cd tiny-link


---

### 2️⃣ Setup Environment

Copy `.env.example` → `.env`:

DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/tinylink?sslmode=require"
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="http://localhost:3000"


---

### 3️⃣ Install & Migrate

npm install
npx prisma generate
npx prisma db push  # or migrate deploy


---

### 4️⃣ Run Development Server


npm run dev


**Dashboard**: [http://localhost:3000](http://localhost:3000)

---

## 📡 API Overview

### Link Management

POST  /api/links        # { url: "https://...", code?: "custom" }
GET   /api/links        # List user's links
GET   /api/links/:code  # Stats for code
DELETE /api/links/:code # Delete link


### Redirects & Health

GET  /:code           # 302 redirect + increment clicks
GET  /healthz         # { "ok": true, "version": "1.0" }


**Create Link Payload:**

{
"url": "https://google.com",
"code": "google"  // optional custom code
}


---

## 👨‍💻 Frontend Flows

1. **Dashboard** → Form: Enter URL → **Shorten**
2. **Success** → Copy `tiny.link/abc123` + view clicks
3. **Stats** `/code/abc123` → Total clicks + timestamps
4. **Delete** → Confirm → Removed from list
5. **Invalid URL** → Inline error + shake animation

---

## 🔐 Environment Configuration

RequiredDATABASE_URL="postgresql://...@ep-xxx.neon.tech/tinylink?sslmode=require"OptionalNEXTAUTH_SECRET="sk-..."  # Generate with openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"


---

## 👨‍💻 Author

**Harsh Agarwal**

- GitHub: [@Harsh427744](https://github.com/harsh323dev)
- LinkedIn: [harsh323](https://www.linkedin.com/in/harsh323)
- Email: [harshagarwal323.ag@gmail.com](mailto:harshagarwal323.ag@gmail.com)

---

⭐ **Star this repo if you find it helpful!**

---
*Built for take-home assignment • Deployed on Vercel + Neon • Production-ready*


