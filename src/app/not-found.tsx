import Link from "next/link";
import { Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";

export default function NotFound() {
  return (
    <main className="container py-20">
      <EmptyState
        icon={Compass}
        title="Page not found"
        description="The tide must have carried it away."
        action={
          <Link href="/" className={buttonVariants()}>
            Back home
          </Link>
        }
      />
    </main>
  );
}
