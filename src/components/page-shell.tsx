"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageShellProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

// Common page frame with a subtle entrance animation.
export function PageShell({ title, description, children, className, narrow }: PageShellProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("container py-10 md:py-14", narrow && "max-w-3xl", className)}
    >
      {(title || description) && (
        <header className="mb-8 space-y-2">
          {title && <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>}
          {description && <p className="max-w-2xl text-muted-foreground">{description}</p>}
        </header>
      )}
      {children}
    </motion.main>
  );
}

export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("prose prose-neutral max-w-none dark:prose-invert prose-headings:font-heading", className)}>
      {children}
    </div>
  );
}
