import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  try {
    await db.insert(newsletterSubscribers).values({ email }).onConflictDoNothing();
  } catch {
    // Unique violations are fine — treat as already subscribed
  }

  return NextResponse.json({ ok: true, message: "Welcome to the inner circle." });
}
