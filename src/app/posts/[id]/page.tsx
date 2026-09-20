import { PageShell } from "@/components/page-shell";
import { PostView } from "@/features/posts/components/post-view";

export default async function PostPage({ params }: PageProps<"/posts/[id]">) {
  const { id } = await params;
  return (
    <PageShell>
      <PostView id={id} />
    </PageShell>
  );
}
