import type { Metadata } from "next";
import { PageShell, Prose } from "@/components/page-shell";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <PageShell title="Terms of service" description="Last updated September 2026." narrow>
      <Prose>
        <h2>1. Your account</h2>
        <p>
          You are responsible for keeping your password safe and for everything published from your account. You must
          be at least 13 years old to use BlogTide.
        </p>
        <h2>2. Your content</h2>
        <p>
          You own what you write. By publishing on BlogTide you give us a licence to host and display it. Do not post
          content that is illegal, hateful, or that you do not have the right to share.
        </p>
        <h2>3. Acceptable use</h2>
        <p>
          Do not attempt to disrupt the service, scrape other users&apos; data, or bypass rate limits or security
          controls.
        </p>
        <h2>4. Termination</h2>
        <p>
          You can delete your account at any time from the Account page. We may suspend accounts that break these
          terms.
        </p>
        <h2>5. Changes</h2>
        <p>We may update these terms; continued use after a change means you accept the new version.</p>
      </Prose>
    </PageShell>
  );
}
