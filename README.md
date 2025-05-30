<!-- last update: may, 05/2025 -->

# 🌙 Lunitea Boilerplate

**Lunitea** is a modern and elegant starter webapp built with **Next.js 15**, designed to accelerate the development of SaaS products and modern web applications while incorporating best practices by default.

Lunitea is built with TypeScript to ensure type safety and minimize errors. While it’s designed to be beginner-friendly, developers with basic TypeScript knowledge (just 1 hour of learning) can get up and running quickly. The boilerplate is highly customizable, making it perfect for developers of all skill levels.

It uses Next.js for a fast, flexible setup that saves development time and supports modern full-stack capabilities out of the box. Styling is handled with Tailwind CSS and shadcn/ui, giving you a modern, utility-first design system with highly composable and accessible components—ideal for building clean, responsive UIs efficiently.

Authentication is powered by NextAuth.js, a native solution for Next.js apps that keeps everything within your codebase—giving you full control without vendor lock-in. Unlike third-party platforms like Clerk, NextAuth lets you own your data, customize logic freely, and scale without unexpected limitations or pricing surprises.

> 🎯 **Lunitea handles the repetitive setup work—auth, UI, theming, protected routes, and admin panels so you can skip the boilerplate and start building your actual product from day one.**  
> Just open the dashboard and build — you start from 80% done.



***This folder includes everything you need to get started — no GitHub setup required.**

## 📚 Table of Contents

- [✨ Key Features](#-key-features)
- [📦 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [🗂️ Project Structure](#️-project-structure)
- [🔐 Authentication](#-authentication)
- [📊 Analytics](#-analytics)
- [🎨 Theming](#-theming)
- [🛣️ Roadmap & Updates](#️-roadmap--updates)
- [📄 License](#-license)
- [📬 Support](#-support)

## ✨ Key Features

- ⚡ Built with Next.js 15 (App Router + Server Components)
- 🧠 TypeScript support for type safety
- 🎨 Tailwind CSS with a custom design system
- 🔐 Preconfigured Google Sign-In using NextAuth.js
- 🌗 Light and dark mode support out of the box
- 🧩 UI components from `shadcn/ui`
- 📁 Scalable and modular folder structure
- 🧪 SaaS-ready boilerplate for real-world apps

---

## 📦 Tech Stack

| Tool         | Purpose                                   |
|--------------|-------------------------------------------|
| Next.js 15   | Core framework with App Router            |
| Tailwind CSS | Utility-first styling                     |
| TypeScript   | Static typing for scalable development    |
| NextAuth.js  | Authentication (Google OAuth pre-set)     |
| shadcn/ui    | Reusable UI components                    |
| Lucide Icons | Clean, modern icon set                    |

---

## 🚀 Getting Started

### 1. Install Dependencies

Ensure you have **Node.js 18+** installed, then run:

```bash
npm install
# or
yarn install
# or
pnpm install
```

💡 **Installation issues?**

If you encounter peer dependency errors (commonly with `shadcn/ui`), try:

```bash
npm install --legacy-peer-deps
```

Or, for `shadcn-ui` CLI component additions:

```bash
npx shadcn-ui@latest add button -- --legacy-peer-deps
```

---

### 2. Set Up Environment Variables
# NOTE: you can visit (ENV_SETUP.md) in the route folder for more details 
Create a `.env.local` file in the root directory and add the following:

```env
# ✅ Secret used by NextAuth.js to sign and encrypt session cookies.
# Generate one here: https://generate-secret.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret

# ✅ MongoDB connection 
MONGODB_URI=your_mongodb_URI
# ✅ Google OAuth credentials for authentication
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```
### NOTE:
Use these environment variables to run the app locally. **Remember to never share your secrets** publicly! Instead, store your secrets as environment variables in your hosting provider (e.g., Vercel, Heroku, AWS...etc).

# vercel environment variables example 
### 🟢 For Production (Vercel)

When deploying to Vercel, you'll need to set these same variables in your project settings:

1. Go to your Vercel dashboard: [https://vercel.com/dashboard]
2. Select your project.
3. Navigate to the **Settings → Environment Variables** section.
4. Add each of the keys above with the same names:
   - `NEXTAUTH_SECRET`
   - `MONGODB_URI`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
5. Set the environment to **Production**, **Preview**, or **Development** depending on your needs.
6. Redeploy your project to apply changes.

> 💡 remember!: Never commit `.env.local` to Git. It's ignored by default in `.gitignore`.

---

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Your app will be available at: [http://localhost:3000]

---

## 🗂️ Project Structure

```
lunitea/
├── public/                     # Static assets (images, icons, etc.)
├── src/
│   ├── app/                    # App Router (layouts, pages, routing logic)
│   ├── components/             # Reusable and page-specific UI components
│   ├── context/                # React contexts
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions and helpers
│   ├── models/                 # Database models and schemas
│   └── middleware.tsx          # Middleware logic (auth, redirects)
├── .env.example                # Example environment variables
├── tailwind.config.ts          # Tailwind CSS configuration
```

---

### 🔐 Authentication

#### ⚠️ Important: Role Access Setup

By default, newly created accounts are assigned the `user` role. To access the `/adminPanel` or perform admin-level actions, you’ll need to manually update your role to `moderator` or `admin` in MongoDB.

**Steps to update your role:**
1. Log in to your [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account.
2. Navigate to your project and open the relevant collection (`users`).
3. Locate the document for your account.
4. Find the `role` field and change its value from `"user"` to `"moderator"` or `"admin"`.
5. ⚠️ **Important:** After making the change, **log out and log back in** for the new role to take effect.

---

#### 👤 User Roles

| Role              | Access Level                                                                 |
|-------------------|-------------------------------------------------------------------------------|
| `user`            | Basic access — can view dashboard pages only. Restricted from APIs like `/users`, `/waitlist`, and other admin endpoints. |
| `moderator` / `admin` | Full access — includes the admin panel and all protected APIs.              |

---

#### 🔒 Route & API Protection  
(Refer to `src/middleware.tsx` — the code is well-commented and explains role handling, protected pages, and APIs.)

- `/waitlist` and `/contact` APIs are **public** — no authentication is required to submit data (**POST requests only**). Other methods (GET, PUT, DELETE, etc.) are not allowed.
- `/dashboard` and related pages require authentication with at least a `user` role.
- `/adminPanel` and admin-specific pages require a `moderator` or `admin` role.
- `/profile` is accessible only by the logged-in user or users with elevated roles (`moderator` or `admin`).


### ⚠️ Behavior on Unauthorized Access

- Protected pages and APIs return proper **unauthenticated** or **forbidden** responses.
- The UI handles this by:
  - Redirecting unauthenticated users to a **denied** page, or
  - Displaying a `"Unauthenticated"` message when necessary.

---

> ✅ This role-based access system helps ensure both flexibility and security across the application.


---
## 📊 Analytics

Lunitea comes with [Vercel Analytics](https://vercel.com/docs/analytics) enabled by default, giving you out-of-the-box performance insights and page-level metrics without additional setup.
---

### 🎨 Theming

Lunitea includes a fully custom color system built into Tailwind, supporting both **light** and **dark** modes.
Also includes colors for `success`, `warning`, and `error` states.
Customize your palette in `tailwind.config.ts`.

---

## 🛣️ Roadmap & updates

- ✅ you will recieve every new update in your email

---

## 📄 License

Lunitea is open-source and licensed under the **MIT License**. You’re free to use, modify, and distribute it in both personal and commercial projects.

---

## 📬 Support

report bug or have feedback? Reach out on: [https://lunitea.vercel.app/contact] 
follow me for updates and apps that can help you in the future: [https://x.com/Damine_dev] 
#   l i n k a t o  
 