# Deploying Startup Engine Pakistan to Vercel

This application is configured for seamless deployment on [Vercel](https://vercel.com) with a full-stack architecture:
- **Frontend**: High-performance React 19 + Vite SPA served via Vercel's Edge CDN.
- **Backend API**: Serverless Express functions running on Vercel Node.js runtime (`api/index.ts`).

---

## Quick Start (Deploy in 2 Minutes)

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [vercel.com/new](https://vercel.com/new) and log in.
3. Import your repository.
4. Under **Project Settings**:
   - **Framework Preset**: `Vite` (automatically detected)
   - **Build Command**: `vite build` (preconfigured in `vercel.json`)
   - **Output Directory**: `dist`
5. Expand **Environment Variables** and add:
   - `GEMINI_API_KEY`: Your Google Gemini API key (from [Google AI Studio](https://aistudio.google.com/))
6. Click **Deploy**.

---

### Method 2: Deploy via Vercel CLI

1. Install the Vercel CLI if you haven't already:
   ```bash
   npm i -g vercel
   ```

2. Link and deploy from your project root:
   ```bash
   vercel
   ```

3. Set your environment variable:
   ```bash
   vercel env add GEMINI_API_KEY
   ```

4. Deploy to production:
   ```bash
   vercel --prod
   ```

---

## Configuration Files Explained

- **`vercel.json`**:
  - Sets the build command to `vite build` and output directory to `dist`.
  - Configures rewrites so `/api/(.*)` routes to the serverless function `/api/index.ts`.
  - Configures SPA client-side routing so all page routes (`/dashboard`, `/validate`, `/pricing`, `/calculator`) resolve to `/index.html`.
- **`api/index.ts`**:
  - The Vercel Serverless Function entry point.
  - Mounts the Express API router handling `/api/health`, `/api/generate-report`, and `/api/verify-slip`.
- **`.vercelignore`**:
  - Excludes local build artifacts and sensitive `.env` files from deployments.

---

## Required Environment Variables

| Variable | Description | Required |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Google Gemini API Key for real-time Pakistani startup validation and VC thesis matching. *(If omitted, the engine uses the built-in deterministic Pakistani financial model fallback).* | Recommended |

---

## Health Check
Once deployed, verify your deployment by visiting:
```
https://<your-vercel-domain>/api/health
```
You should see:
```json
{
  "status": "ok",
  "service": "Startup Engine Pakistan AI Core",
  "gemini_configured": true,
  "timestamp": "..."
}
```
