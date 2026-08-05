import { isAdminAuthorized } from "@/lib/waitlist/admin-auth";
import { listWaitlistSignups } from "@/lib/waitlist/repository";
import { isWaitlistConfigured } from "@/lib/waitlist/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isWaitlistConfigured()) {
    return NextResponse.json({ error: "Waitlist database not configured." }, { status: 503 });
  }

  try {
    const signups = await listWaitlistSignups();
    return NextResponse.json({ signups, total: signups.length });
  } catch {
    return NextResponse.json({ error: "Failed to load waitlist." }, { status: 500 });
  }
}
