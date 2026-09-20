import Link from "next/link";
import { Waves } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 font-heading text-xl font-bold tracking-tight", className)}>
      <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-sm">
        <Waves className="size-4" />
      </span>
      <span>
        Blog<span className="text-violet-600 dark:text-violet-400">Tide</span>
      </span>
    </Link>
  );
}
