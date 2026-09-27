import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const comment = typeof body?.comment === "string" ? body.comment.trim() : "";
  const routeId = typeof body?.routeId === "string" ? body.routeId.slice(0, 80) : "unknown";
  const locale = body?.locale === "en" || body?.locale === "de" ? body.locale : "nl";
  const rating = Number(body?.rating);

  if (body?.website) return NextResponse.json({ ok: true });
  if (
    name.length < 2 || name.length > 80 || !emailPattern.test(email) ||
    comment.length < 20 || comment.length > 1200 ||
    !Number.isInteger(rating) || rating < 1 || rating > 5 || body?.consent !== true
  ) {
    return NextResponse.json({ message: "Controleer de ingevulde gegevens en toestemming." }, { status: 400 });
  }

  const webhookUrl = process.env.REVIEW_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ message: "Reviewinzendingen worden binnenkort geactiveerd." }, { status: 503 });
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.REVIEW_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.REVIEW_WEBHOOK_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({
      type: "route-review-submission",
      submittedAt: new Date().toISOString(),
      name,
      email,
      rating,
      comment,
      routeId,
      locale,
      publicationConsent: true,
      moderationStatus: "pending",
    }),
    cache: "no-store",
  }).catch(() => null);

  if (!response?.ok) {
    return NextResponse.json({ message: "Versturen lukt nu niet. Probeer het later opnieuw." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
