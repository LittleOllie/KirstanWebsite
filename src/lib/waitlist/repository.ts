import type { WaitlistSignup, WaitlistSignupInput } from "./types";
import { getSupabaseAdmin } from "./supabase";

const TABLE = "waitlist_signups";

type DbRow = {
  id: string;
  email: string;
  first_name: string;
  answers: Record<string, string | string[]>;
  source: string;
  notified_at: string | null;
  created_at: string;
};

function toSignup(row: DbRow): WaitlistSignup {
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name,
    answers: row.answers ?? {},
    source: row.source,
    notifiedAt: row.notified_at,
    createdAt: row.created_at,
  };
}

export async function createWaitlistSignup(
  input: WaitlistSignupInput
): Promise<WaitlistSignup> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      email: input.email,
      first_name: input.firstName,
      answers: input.answers,
      source: input.source ?? "waitlist",
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      const label = input.source === "contact" ? "contact request" : "waitlist";
      throw new Error(`This email has already been submitted on the ${label}.`);
    }
    throw error;
  }

  return toSignup(data as DbRow);
}

export async function listWaitlistSignups(): Promise<WaitlistSignup[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data as DbRow[]).map(toSignup);
}
