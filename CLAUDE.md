@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

BlogTide web client — Next.js 16 App Router + TypeScript, Tailwind v4, shadcn/ui (base-nova style on `@base-ui/react`, **not** Radix), Zustand, TanStack Query, React Hook Form + Zod, Tiptap v3, Framer Motion, next-themes. The API is a separate Go repo (`blogtide` backend); `README.md` here covers the client-side auth model.

No test suite exists yet.

## Commands

```bash
npm run dev
npm run build         # also runs the TypeScript check
npm run lint          # eslint (flat config)
npx tsc --noEmit
npx shadcn@latest add <component>   # UI primitives live in src/components/ui
```

`NEXT_PUBLIC_API_URL` (in `.env.local`) is the only env var; it is read solely in `src/config/env.ts`.

## Architecture

Feature-based layout under `src/`:

- `app/` — routes only. Pages that need a session wrap content in `RequireAuth`; login/signup use `GuestOnly`. Pages reading `useSearchParams` are wrapped in `<Suspense>`. `providers.tsx` composes ThemeProvider → QueryClientProvider → TooltipProvider + session bootstrap + Toaster.
- `features/auth/` — `store/auth.store.ts` (Zustand: `accessToken`, `user`, `status`; deliberately not persisted), `api/auth.api.ts` (axios calls), `api/use-auth.ts` (mutations that update the store and toast), `hooks/use-session.ts` (`useSession` + one-shot `useSessionBootstrap` that calls refresh on load), `schema.ts` (Zod, mirrors the Go validators), `components/`.
- `features/posts/` — same shape; `api/use-posts.ts` owns the `postKeys` query-key factory and invalidates `postKeys.lists()` after every mutation. Posts are sent as `multipart/form-data` (see `posts.api.ts`) so the optional `cover` file rides along.
- `lib/axios.ts` — single client. Request interceptor attaches the Bearer token from `useAuthStore.getState()`; response interceptor does a single-flight refresh on 401 and retries once. `refreshSession()` is the only place the refresh cookie is used and always sends `X-Requested-With`.
- `lib/query-client.ts` — per-request client on the server, singleton in the browser.
- `components/` — shared UI; `components/ui/` is shadcn-generated (edit sparingly). `PageShell`/`Prose` in `page-shell.tsx` are the standard page frame.

## API contract (from the Go backend)

All under `${NEXT_PUBLIC_API_URL}/api`; errors are always `{ "error": string }`. Auth responses are `{ access_token, user }`. `GET /posts` returns `{ items, page, page_size, total, total_pages }` with summaries (no body); `GET /posts/:id` returns the full post with `author: { id, username }`. Only the author may `PUT`/`DELETE` a post.

## Gotchas

- shadcn here uses Base UI primitives: use the `render={<Link … />}` prop instead of `asChild`, and `buttonVariants()` on a `<Link>` for link-styled buttons. Icons inside `Button` take `data-icon="inline-start|inline-end"` for spacing.
- Tiptap must be created with `immediatelyRender: false` (SSR). StarterKit v3 already bundles Link and Underline — don't add those extensions separately.
- Route guards are client-side only (the access token is in memory and the refresh cookie is path-scoped to the API), so there is no `proxy.ts`.
- `globals.css` is shadcn-generated plus: `@plugin "@tailwindcss/typography"`, violet `--primary`/`--ring`, a `container` utility, and Tiptap placeholder styles. Heading font is Merriweather via `--font-serif` → `--font-heading`.
- Post bodies are rendered with `dangerouslySetInnerHTML`; the backend sanitises them with bluemonday, so keep any new editor extensions within what that policy allows.
