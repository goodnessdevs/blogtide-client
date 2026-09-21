"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, PenSquare, Settings, UserRound } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/features/auth/hooks/use-session";
import { useLogout } from "@/features/auth/api/use-auth";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated } = useSession();
  const logout = useLogout();

  const initials = user?.username.slice(0, 2).toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  pathname === l.href && "bg-muted text-foreground",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isLoading ? (
            <Skeleton className="size-8 rounded-full" />
          ) : isAuthenticated && user ? (
            <>
              <Link href="/write" className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}>
                <PenSquare data-icon="inline-start" />
                Write
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="ghost" size="icon" className="rounded-full" aria-label="Account menu" />}
                >
                  <Avatar size="sm">
                    <AvatarFallback className="bg-gradient-to-br from-violet-600 to-fuchsia-600 text-xs text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  {/* Base UI requires a label to live inside a group. */}
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <div className="truncate font-medium">{user.username}</div>
                      <div className="truncate text-xs font-normal text-muted-foreground">{user.email}</div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem render={<Link href="/write" />}>
                    <PenSquare /> Write a post
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href={`/posts?author_id=${user.id}`} />}>
                    <UserRound /> My posts
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href="/account" />}>
                    <Settings /> Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={() => logout.mutate()}>
                    <LogOut /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                Sign in
              </Link>
              <Link href="/signup" className={buttonVariants({ size: "sm" })}>
                Get started
              </Link>
            </div>
          )}

          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}>
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1 px-4">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                      pathname === l.href && "bg-muted text-foreground",
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
                {!isLoading && !isAuthenticated && (
                  <>
                    <div className="my-2 border-t" />
                    <Link href="/login" className={buttonVariants({ variant: "outline" })}>
                      Sign in
                    </Link>
                    <Link href="/signup" className={buttonVariants()}>
                      Get started
                    </Link>
                  </>
                )}
                {isAuthenticated && (
                  <>
                    <div className="my-2 border-t" />
                    <Link href="/write" className={buttonVariants()}>
                      <PenSquare data-icon="inline-start" /> Write
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
