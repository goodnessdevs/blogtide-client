"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PenSquare, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { usePosts } from "@/features/posts/api/use-posts";
import { PostCard, PostCardSkeleton } from "@/features/posts/components/post-card";
import { useSession } from "@/features/auth/hooks/use-session";

export default function HomePage() {
  const { isAuthenticated } = useSession();
  const { data, isPending } = usePosts({ page: 1, page_size: 6 });

  return (
    <main>
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-violet-500/15 via-fuchsia-500/5 to-transparent" />
        <div className="container flex flex-col items-center gap-6 py-24 text-center md:py-32">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <Sparkles className="size-3.5 text-violet-500" /> Write. Publish. Ride the tide.
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="max-w-3xl font-heading text-4xl font-black tracking-tight text-balance md:text-6xl"
          >
            A calm place for your{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">ideas</span>{" "}
            to land
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl text-lg text-muted-foreground"
          >
            BlogTide is a simple, fast blogging space. No feeds to game, no noise — just your words and the people who
            want to read them.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link href={isAuthenticated ? "/write" : "/signup"} className={buttonVariants({ size: "lg" })}>
              <PenSquare data-icon="inline-start" /> {isAuthenticated ? "Write a post" : "Start writing"}
            </Link>
            <Link href="/posts" className={buttonVariants({ size: "lg", variant: "outline" })}>
              Browse posts <ArrowRight data-icon="inline-end" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight">Latest posts</h2>
            <p className="text-sm text-muted-foreground">Fresh from the tide.</p>
          </div>
          <Link href="/posts" className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isPending
            ? Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
            : data?.items.map((p, i) => <PostCard key={p.id} post={p} index={i} />)}
        </div>
        {!isPending && data?.items.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">Nothing published yet — be the first.</p>
        )}
      </section>
    </main>
  );
}
