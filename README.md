# Nexora Frontend

Storefront for Nexora — browse clothes, add to bag, login, checkout.

Backend repo: https://github.com/1ambuj/-nexora_backend

## What it does

- Product browsing and search
- Cart (works as guest, then syncs after login)
- Login / signup
- Address + payment flow
- Order success and track order

Built with **Next.js**, **TypeScript**, **Tailwind**, **Zustand**, and **TanStack Query**.

## Run locally

```bash
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

```bash
npm run dev
```

Open `http://localhost:3001`

Make sure the backend is running too.

## Deploy

Deploy on Vercel and set:

- `NEXT_PUBLIC_BACKEND_URL` → your live backend `/api/v1` URL
- `NEXT_PUBLIC_SITE_URL` → your Vercel URL

Redeploy after changing env vars.

## Author

Ambuj Mishra — https://github.com/1ambuj
