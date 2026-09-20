"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, FileText, Search, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/empty-state";
import { usePosts } from "../api/use-posts";
import { PostCard, PostCardSkeleton } from "./post-card";

const PAGE_SIZE = 9;

export function PostList() {
  const router = useRouter();
  const params = useSearchParams();

  const page = Math.max(1, Number(params.get("page") ?? 1));
  const authorId = params.get("author_id") ?? undefined;
  const [search, setSearch] = useState(params.get("q") ?? "");
  const q = useDeferredValue(search.trim());

  const { data, isPending, isError, isPlaceholderData } = usePosts({
    page,
    page_size: PAGE_SIZE,
    q: q || undefined,
    author_id: authorId,
  });

  const goTo = (p: number) => {
    const next = new URLSearchParams(params.toString());
    next.set("page", String(p));
    router.push(`/posts?${next.toString()}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or subtitle…"
            className="h-10 pl-9"
            aria-label="Search posts"
          />
        </div>
        {authorId && (
          <Link href="/posts" className={buttonVariants({ variant: "outline" })}>
            <X data-icon="inline-start" /> Showing one author — clear
          </Link>
        )}
      </div>

      {isError ? (
        <EmptyState icon={FileText} title="Could not load posts" description="Check that the API is running and try again." />
      ) : isPending ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      ) : data.items.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={q ? "No posts match your search" : "No posts yet"}
          description={q ? "Try a different word or clear the search." : "Be the first to publish something."}
          action={
            <Link href="/write" className={buttonVariants()}>
              Write a post
            </Link>
          }
        />
      ) : (
        <>
          <div className={isPlaceholderData ? "opacity-60 transition-opacity" : "transition-opacity"}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((p, i) => (
                <PostCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </div>

          {data.total_pages > 1 && (
            <nav className="flex items-center justify-between border-t pt-6" aria-label="Pagination">
              <span className="text-sm text-muted-foreground">
                Page {data.page} of {data.total_pages} · {data.total} posts
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => goTo(page - 1)}>
                  <ChevronLeft data-icon="inline-start" /> Previous
                </Button>
                <Button variant="outline" size="sm" disabled={page >= data.total_pages} onClick={() => goTo(page + 1)}>
                  Next <ChevronRight data-icon="inline-end" />
                </Button>
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
