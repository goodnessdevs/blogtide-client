"use client";

import { PageShell } from "@/components/page-shell";
import { RequireAuth } from "@/features/auth/components/auth-guards";
import { useCreatePost } from "@/features/posts/api/use-posts";
import { PostForm } from "@/features/posts/components/post-form";

function WriteForm() {
  const create = useCreatePost();
  return <PostForm isPending={create.isPending} onSubmit={(values) => create.mutate(values)} />;
}

export default function WritePage() {
  return (
    <RequireAuth>
      <PageShell title="Write a post" description="Your words, your pace. Publish when it feels right." narrow>
        <WriteForm />
      </PageShell>
    </RequireAuth>
  );
}
