# 🔗 TinyLink – Production-Ready URL Shortener

> Minimal URL shortener with DNS validation, custom codes, click tracking, and real-time analytics (Next.js 15 + Neon PostgreSQL + Prisma)

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Neon](https://img.shields.io/badge/Neon_DB-00E599?style=for-the-badge&logo=neondatabase&logoColor=white)](https://neon.tech/)
[![Prisma](https://img.shields.io/badge/Prisma-3F37C9?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**🚀 Live Demo:** [https://tiny-link-harsh.vercel.app/](https://tiny-link-harsh.vercel.app/)

---

## 📸 Dashboard Preview

![TinyLink Dashboard](./public/dashboard.png)

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

**TinyLink** is a production-ready URL shortener built with enterprise-grade validation, featuring:

- **DNS Verification** – Only accepts real, existing domains
- **Custom short codes** with duplicate protection
- **Real-time click tracking** with timestamps
- **Beautiful gradient UI** with toast notifications
- **Instant updates** without page reload
- **Copy-to-clipboard** functionality
- **Delete functionality** with confirmation
- **Deployed on Vercel** with Neon PostgreSQL

Demonstrates Next.js 15 App Router, Prisma ORM, DNS validation, and full-stack TypeScript patterns.

---

## ✨ Features

### 🔗 Core URL Shortening

- ✅ **Shorten any URL** → tiny-link-harsh.vercel.app/abc123
- ✅ **Auto-add https://** for user convenience (e.g., google.com → https://google.com)
- ✅ **DNS verification** – Rejects fake domains (e.g., codechef.co fails, codechef.com works)
- ✅ **Custom codes** (e.g., tiny.link/mylink)
- ✅ **Duplicate protection** – Rejects existing codes with clear error message
- ✅ **Smart redirects** with click counting
- ✅ **Last clicked timestamp** tracking

### 📊 Analytics & Management

- 📈 **Real-time stats** – Total clicks + last click timestamp per link
- 🗑️ **Delete links** with loading state and confirmation
- 📋 **List all your links** with beautiful card layout
- 📋 **Copy-to-clipboard** with toast notification
- ⚡ **Instant UI updates** – No page reload needed
- 🎨 **Toast notifications** for all actions (success/error)

### 🛡️ Validation & Security

- 🔍 **3-Layer validation**:
  1. Format check (valid URL structure)
  2. TLD check (200+ valid domain extensions)
  3. **DNS check** (domain must actually exist)
- 🚫 **Rejects invalid URLs**:
  - ❌ Fake TLDs (e.g., .ap, .xyz123)
  - ❌ Non-existent domains (e.g., fake-site-12345.com)
  - ❌ Malformed URLs
- ✅ **Accepts all valid formats**:
  - google.com
  - `https://github.com
  - perplexity.ai
  - vercel.app

### 🎨 UI/UX

- 🌈 **Modern gradient design** with animations
- 📱 **Fully responsive** – Mobile, tablet, desktop
- 🎯 **Real-time validation feedback**
- ⚡ **Loading states** on all buttons
- 🎉 **Success animations** with toast
- 🚀 **Smooth transitions** and hover effects
- 📊 **Stats visualization** with icons
- ❌ **Clear error messages** with context

---

## 🛠️ Tech Stack

| Layer          | Technologies                                                |
|----------------|-------------------------------------------------------------|
| **Framework**  | Next.js 15 (App Router), TypeScript, React 19              |
| **Database**   | Neon PostgreSQL (Serverless), Prisma ORM                    |
| **Styling**    | Tailwind CSS, CSS Gradients, Animations                     |
| **Validation** | DNS Resolution (Node.js `dns/promises`), URL API            |
| **UI Library** | React Hot Toast (notifications)                             |
| **Deployment** | Vercel (serverless functions + edge network)                |
| **Dev Tools**  | ESLint, Prettier, Prisma Studio, TypeScript Strict Mode     |

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


