# BlogTide — web client

Next.js 16 (App Router, TypeScript) frontend for BlogTide. Talks to the Go API in the `blogtide` backend repo.

Stack: Tailwind v4, shadcn/ui, Zustand, TanStack Query, React Hook Form + Zod, Tiptap, Framer Motion, next-themes.

## Run

```bash
cp .env.example .env.local     # NEXT_PUBLIC_API_URL=http://localhost:8080
npm install
npm run dev                    # http://localhost:3000
```

The API must be running for anything beyond the static pages. Sign-up, verification codes and password resets are driven by the backend; when it has no SMTP configured it prints the codes/links to its own terminal.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | dev server (Turbopack) |
| `npm run build` | production build, includes the TypeScript check |
| `npm run start` | serve the build |
| `npm run lint` | ESLint |
| `npx shadcn@latest add <name>` | add a UI primitive to `src/components/ui` |

## Layout

```
src/
├── app/            routes only (thin)
├── features/
│   ├── auth/       store, api + react-query hooks, zod schema, forms, guards
│   └── posts/      api + hooks, schema, editor, cards, list, view
├── components/     shared UI (+ ui/ from shadcn)
├── lib/            axios client, query client, cn(), error helper
└── config/         env
```

## Auth model (client side)

The access token is kept **in memory** (Zustand, not persisted). On page load `useSessionBootstrap` calls `POST /api/auth/refresh` — the httpOnly refresh cookie plus a required `X-Requested-With` header — to mint a fresh access token. The axios response interceptor repeats that once on any 401 and retries the request. Route guards (`RequireAuth`, `GuestOnly`) are client components; there is no `proxy.ts`.
