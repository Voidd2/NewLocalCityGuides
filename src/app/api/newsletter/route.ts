import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { email?: unknown; consent?: unknown; locale?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const locale = body?.locale === "en" || body?.locale === "de" ? body.locale : "nl";

  if (!emailPattern.test(email) || body?.consent !== true) {
    return NextResponse.json({ message: "Vul een geldig e-mailadres in en geef toestemming." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env[`RESEND_AUDIENCE_ID_${locale.toUpperCase()}`] ?? process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    return NextResponse.json({ message: "De nieuwsbriefinschrijving wordt binnenkort geactiveerd." }, { status: 503 });
  }

  const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, unsubscribed: false }),
    cache: "no-store",
    signal: AbortSignal.timeout(5_000),
  }).catch(() => null);

  if (!response?.ok) {
    const errorId = crypto.randomUUID();
    console.error("newsletter_upstream_failed", { errorId, status: response?.status ?? "network", cfRay: request.headers.get("cf-ray") });
    return NextResponse.json({ message: "Inschrijven lukt nu niet. Probeer het later opnieuw.", errorId }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }

  return NextResponse.json({ ok: true });
}
