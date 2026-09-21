import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { env } from "@/config/env";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const heading = Merriweather({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: { default: env.appName, template: `%s · ${env.appName}` },
  description: "A calm place to write, publish and read.",
  applicationName: env.appName,
  appleWebApp: { capable: true, title: env.appName, statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable} ${heading.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Providers>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
