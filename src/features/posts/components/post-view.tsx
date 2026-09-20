"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, FileQuestion, Pencil } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/empty-state";
import { Prose } from "@/components/page-shell";
import { useSession } from "@/features/auth/hooks/use-session";
import { usePost } from "../api/use-posts";
import { DeletePostButton } from "./delete-post-button";

export function PostView({ id }: { id: string }) {
  const { data: post, isPending, isError } = usePost(id);
  const { user } = useSession();

  if (isPending) return <PostViewSkeleton />;
  if (isError || !post) {
    return (
      <EmptyState
        icon={FileQuestion}
        title="Post not found"
        description="It may have been deleted, or the link is wrong."
        action={
          <Link href="/posts" className={buttonVariants({ variant: "outline" })}>
            <ArrowLeft data-icon="inline-start" /> Back to posts
          </Link>
        }
      />
    );
  }

  const isOwner = user?.id === post.author.id;

  return (
    <article className="mx-auto max-w-3xl">
      <Link href="/posts" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> All posts
      </Link>

      <header className="space-y-4">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-balance md:text-5xl">{post.title}</h1>
        {post.subtitle && <p className="text-lg text-muted-foreground md:text-xl">{post.subtitle}</p>}

        <div className="flex flex-wrap items-center justify-between gap-4 border-y py-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white">
                {post.author.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <Link href={`/posts?author_id=${post.author.id}`} className="font-medium hover:underline">
                {post.author.username}
              </Link>
              <div className="text-muted-foreground">
                <time dateTime={post.published_at}>{format(new Date(post.published_at), "MMMM d, yyyy")}</time>
                {post.updated_at !== post.created_at && " · edited"}
              </div>
            </div>
          </div>

          {isOwner && (
            <div className="flex items-center gap-2">
              <Link href={`/posts/${post.id}/edit`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                <Pencil data-icon="inline-start" /> Edit
              </Link>
              <DeletePostButton id={post.id} />
            </div>
          )}
        </div>
      </header>

      {post.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element -- Cloudinary URLs are already optimised
        <img src={post.cover_image_url} alt="" className="my-8 aspect-[21/9] w-full rounded-xl object-cover ring-1 ring-foreground/10" />
      )}

      {/* The API sanitises post HTML with bluemonday before storing it. */}
      <Prose className="mt-8 prose-lg">
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </Prose>
    </article>
  );
}

function PostViewSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-12 w-4/5" />
      <Skeleton className="h-6 w-2/3" />
      <div className="flex items-center gap-3 border-y py-4">
        <Skeleton className="size-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <Skeleton className="aspect-[21/9] w-full rounded-xl" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
