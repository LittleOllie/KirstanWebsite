import { isAdminAuthorized } from "@/lib/waitlist/admin-auth";
import { waitlistToCsv } from "@/lib/waitlist/csv";
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
    const csv = waitlistToCsv(signups);
    const filename = `waitlist-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to export waitlist." }, { status: 500 });
  }
}
