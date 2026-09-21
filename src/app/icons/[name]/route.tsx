import { ImageResponse } from "next/og";

// PWA icons rendered from the logo mark at build time. "maskable" variants
// keep the glyph inside the 80% safe zone so Android's adaptive masks do not
// clip it.
const variants = {
  "192": { size: 192, maskable: false },
  "512": { size: 512, maskable: false },
  "maskable-192": { size: 192, maskable: true },
  "maskable-512": { size: 512, maskable: true },
} as const;

type Name = keyof typeof variants;

export const dynamic = "force-static";

export function generateStaticParams() {
  return Object.keys(variants).map((name) => ({ name }));
}

function Waves({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  );
}

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const variant = variants[name as Name];
  if (!variant) return new Response("Not found", { status: 404 });

  const { size, maskable } = variant;
  const glyph = Math.round(size * (maskable ? 0.45 : 0.6));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)",
          borderRadius: maskable ? 0 : Math.round(size * 0.22),
        }}
      >
        <Waves size={glyph} />
      </div>
    ),
    { width: size, height: size },
  );
}
