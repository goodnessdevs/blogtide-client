import type { Metadata } from "next";
import { PageShell, Prose } from "@/components/page-shell";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy policy" description="Last updated September 2026." narrow>
      <Prose>
        <h2>What we collect</h2>
        <p>
          Your username, email address and a hashed password when you sign up; the posts and images you publish; and
          basic request logs (IP address, timestamps) used to keep the service secure.
        </p>
        <h2>How we use it</h2>
        <p>
          To run your account, send transactional email (verification codes, password resets, account notices) and
          protect the platform from abuse. We do not sell your data or use it for advertising.
        </p>
        <h2>Where it lives</h2>
        <p>
          Account and post data are stored in our database. Cover images are stored with Cloudinary. Emails are sent
          through our SMTP provider.
        </p>
        <h2>Cookies</h2>
        <p>
          We set one httpOnly cookie to keep you signed in. Your theme preference is stored in your browser only.
        </p>
        <h2>Your rights</h2>
        <p>
          You can delete your account and all of your posts at any time from the Account page. Contact us for any
          other request about your data.
        </p>
      </Prose>
    </PageShell>
  );
}
