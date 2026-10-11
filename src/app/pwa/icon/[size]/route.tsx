export const dynamic = "force-static";
export function generateStaticParams() { return [{ size: "192" }, { size: "512" }]; }
export async function GET(_request: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  if (size !== "192" && size !== "512") return new Response("Unsupported icon size", { status: 404 });
  return new Response(null, { status: 308, headers: { Location: "/brand/app-icon-" + size + ".png" } });
}
