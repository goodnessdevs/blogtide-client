import { z } from "zod";

export const MAX_COVER_BYTES = 5 * 1024 * 1024;
export const COVER_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const coverSchema = z
  .instanceof(File)
  .refine((f) => f.size <= MAX_COVER_BYTES, "Cover image must be 5 MB or smaller")
  .refine((f) => COVER_TYPES.includes(f.type), "Cover must be a JPEG, PNG, WebP or GIF")
  .optional();

// Tiptap reports an empty document as "<p></p>", so length checks run on the
// text content rather than the HTML string.
const bodySchema = z.string().refine((html) => stripHtml(html).length >= 20, {
  message: "Write at least a few sentences",
});

export const postSchema = z.object({
  title: z.string().trim().min(3, "At least 3 characters").max(200, "At most 200 characters"),
  subtitle: z.string().trim().max(300, "At most 300 characters"),
  published_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date"),
  body: bodySchema,
  cover: coverSchema,
});
export type PostFormInput = z.infer<typeof postSchema>;

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
