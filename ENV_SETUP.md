
# 🔐 Environment Setup Guide

To run this project locally, you need to configure your environment variables.

---

## 1. Create `.env.local`

In your project root directory, run:

```bash
touch .env.local
```

---

## 2. Add the following to `.env.local`

```env
# ✅ Secret used by NextAuth.js to sign and encrypt session cookies.
# Generate one here: https://generate-secret.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret

# ✅ MongoDB connection string
MONGODB_URI=your-mongodb-uri

# 💡 If you're using MongoDB Atlas, make sure your IP is added to the "Network Access" list,
# or allow access from any IP (0.0.0.0/0) for development.

# ✅ Google OAuth credentials for authentication
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## 3. How to Get These Secrets

### 🔑 `NEXTAUTH_SECRET`

- Visit: [https://generate-secret.vercel.app](https://generate-secret.vercel.app)
- Copy the generated string and paste it into your `.env.local` as `NEXTAUTH_SECRET`.

---

### 🍃 `MONGODB_URI`

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster (if you haven't already).
3. Click **Connect** → **Connect your application**
4. Choose **Node.js**, then copy the connection string. It will look like:

   ```text
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority&appName=YourAppName
   ```

5. Replace:
   - `<username>` with your MongoDB username
   - `<password>` with your password
   - `<cluster>` with your cluster address
   - Optionally, append a database name like `lunitea` at the end of the URI.

---

### 🔐 `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`

1. Visit: [https://console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project or use an existing one.
3. Go to: `APIs & Services` → `OAuth consent screen`, and complete the configuration.
4. Then go to: `Credentials` → **Create Credentials** → **OAuth client ID**
5. Choose **Web application**
6. Under **Authorized redirect URIs**, add:

   ```text
   http://localhost:3000/api/auth/callback/google
   ```

> ⚠️ **Note**: When deploying to production, replace this URI with your production domain:
>
> ```text
> https://yourdomain.com/api/auth/callback/google
> ```

7. Click **Create**
8. Copy the generated **Client ID** and **Client Secret** into your `.env.local`.

---

✅ You're all set! After saving your `.env.local`, **restart your dev server** to apply the changes.
