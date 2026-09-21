import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, Prose } from "@/components/page-shell";

export const metadata: Metadata = { title: "Support" };

const faqs = [
  {
    q: "How do I reset my password?",
    a: "Use “Forgot password?” on the sign-in page. The reset link in the email is valid for 15 minutes.",
  },
  {
    q: "Can I edit or delete a post after publishing?",
    a: "Yes. Open the post — if you wrote it you will see Edit and Delete buttons under the title.",
  },
  {
    q: "What image formats can I use for a cover?",
    a: "JPEG, PNG, WebP or GIF, up to 5 MB.",
  },
  {
    q: "How do I delete my account?",
    a: "Go to Account → Danger zone. Deleting your account removes all of your posts permanently.",
  },
];

export default function SupportPage() {
  return (
    <PageShell title="Support" description="Answers to the questions we get most." narrow>
      <div className="divide-y rounded-xl border">
        {faqs.map((f) => (
          <details key={f.q} className="group px-5 py-4">
            <summary className="cursor-pointer list-none font-medium marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {f.q}
                <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
      <Prose className="mt-8 text-sm">
        <p>
          Still stuck? Email <a href="mailto:support@blogtide.local">support@blogtide.local</a> or read the{" "}
          <Link href="/terms-of-service">terms</Link> and <Link href="/privacy-policy">privacy policy</Link>.
        </p>
      </Prose>
    </PageShell>
  );
}
