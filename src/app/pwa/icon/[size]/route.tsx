import { brandIcon } from "@/lib/brand-icon";
export const dynamic = "force-static";
export function generateStaticParams() { return [{ size: "192" }, { size: "512" }]; }
export async function GET(_request: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  if (size !== "192" && size !== "512") return new Response("Unsupported icon size", { status: 404 });
  return brandIcon(Number(size), true);
}
