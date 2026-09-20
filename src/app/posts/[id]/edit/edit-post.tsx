"use client";

import Link from "next/link";
import { ArrowLeft, FileQuestion, Loader2, ShieldAlert } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { EmptyState } from "@/components/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { RequireAuth } from "@/features/auth/components/auth-guards";
import { useSession } from "@/features/auth/hooks/use-session";
import { usePost, useUpdatePost } from "@/features/posts/api/use-posts";
import { PostForm } from "@/features/posts/components/post-form";

function Editor({ id }: { id: string }) {
  const { user } = useSession();
  const { data: post, isPending, isError } = usePost(id);
  const update = useUpdatePost(id);

  if (isPending) {
    return (
      <div className="grid min-h-[40vh] place-items-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (isError || !post) {
    return <EmptyState icon={FileQuestion} title="Post not found" />;
  }
  if (post.author.id !== user?.id) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Not your post"
        description="Only the author can edit this post."
        action={
          <Link href={`/posts/${id}`} className={buttonVariants({ variant: "outline" })}>
            <ArrowLeft data-icon="inline-start" /> Back to post
          </Link>
        }
      />
    );
  }

  return (
    <PostForm
      post={post}
      isPending={update.isPending}
      onSubmit={(values, { removeCover }) => update.mutate({ input: values, removeCover })}
    />
  );
}

export function EditPost({ id }: { id: string }) {
  return (
    <RequireAuth verified>
      <PageShell title="Edit post" narrow>
        <Editor id={id} />
      </PageShell>
    </RequireAuth>
  );
}
