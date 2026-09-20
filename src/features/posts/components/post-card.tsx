"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import type { PostSummary } from "../types";

export function PostCard({ post, index = 0 }: { post: PostSummary; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: Math.min(index, 6) * 0.05 }}
      className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-shadow hover:shadow-lg hover:shadow-violet-500/10"
    >
      <Link href={`/posts/${post.id}`} className="block">
        {post.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element -- Cloudinary URLs are already optimised
          <img
            src={post.cover_image_url}
            alt=""
            loading="lazy"
            className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="aspect-[16/9] w-full bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-transparent" />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Avatar size="sm">
            <AvatarFallback className="text-[10px]">{post.author.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-foreground">{post.author.username}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.published_at}>{format(new Date(post.published_at), "MMM d, yyyy")}</time>
        </div>
        <Link href={`/posts/${post.id}`} className="space-y-1">
          <h3 className="font-heading text-lg leading-snug font-semibold group-hover:text-violet-600 dark:group-hover:text-violet-400">
            {post.title}
          </h3>
          {post.subtitle && <p className="line-clamp-1 text-sm text-muted-foreground">{post.subtitle}</p>}
        </Link>
        <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
      </div>
    </motion.article>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <Skeleton className="aspect-[16/9] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
