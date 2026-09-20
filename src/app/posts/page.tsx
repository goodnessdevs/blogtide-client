import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/page-shell";
import { PostList } from "@/features/posts/components/post-list";

export const metadata: Metadata = { title: "Posts" };

export default function PostsPage() {
  return (
    <PageShell title="Posts" description="Everything published on BlogTide, newest first.">
      <Suspense>
        <PostList />
      </Suspense>
    </PageShell>
  );
}
