import Link from "next/link";
import { Logo } from "@/components/logo";

const groups = [
  {
    title: "Explore",
    links: [
      { href: "/posts", label: "All posts" },
      { href: "/write", label: "Write" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/support", label: "Support" },
      { href: "/account", label: "Account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms-of-service", label: "Terms of service" },
      { href: "/privacy-policy", label: "Privacy policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            A calm place to write, publish and read. Ride the tide of ideas.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="mb-3 text-sm font-semibold">{g.title}</h3>
            <ul className="space-y-2">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} BlogTide. All rights reserved.</span>
          <span>Built with Next.js and Go.</span>
        </div>
      </div>
    </footer>
  );
}
