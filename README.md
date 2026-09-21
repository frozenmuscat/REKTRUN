# REKTRUN

A wallet-gated browser action runner for Robinhood Chain, built with Next.js and Postgres.

## Local development

1. Copy `.env.example` to `.env.local`.
2. Set a Postgres `DATABASE_URL` and a long random `GAME_SIGNING_SECRET`.
3. Run `npm install`, then `npm run dev`.

The database tables and indexes are created automatically on the first API request.

## Deploy to Vercel

Import this repository and keep the detected **Next.js** framework preset. Add these environment variables for Production, Preview, and Development:

- `DATABASE_URL`: a Vercel Postgres or Neon connection string.
- `GAME_SIGNING_SECRET`: a private random value of at least 32 characters.
- `NEXT_PUBLIC_SITE_URL`: the final `https://...vercel.app` or custom-domain URL.

Use the default commands (`npm install`, `npm run build`) and the repository root as the Root Directory.
