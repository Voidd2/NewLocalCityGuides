import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ size: string }> },
) {
  const { size: requestedSize } = await params;
  const pixels = requestedSize === "192" ? 192 : requestedSize === "512" ? 512 : null;
  if (!pixels) return new Response("Unsupported icon size", { status: 404 });
  const inset = Math.round(pixels * 0.215);
  const circle = pixels - inset * 2;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1B2A4A",
      }}
    >
      <div
        style={{
          width: circle,
          height: circle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: circle / 2,
          background: "#FF6B00",
          color: "white",
          fontSize: Math.round(pixels * 0.23),
          fontWeight: 800,
          letterSpacing: Math.round(pixels * -0.015),
        }}
      >
        YL
      </div>
    </div>,
    { width: pixels, height: pixels },
  );
}
