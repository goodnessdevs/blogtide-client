// Public env is inlined at build time, so it must be read via the literal
// `process.env.NEXT_PUBLIC_*` form rather than dynamically.
export const env = {
  apiUrl: (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, ""),
  appName: "BlogTide",
} as const;
