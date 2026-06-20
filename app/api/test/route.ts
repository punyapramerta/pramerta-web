import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from("client_logos").select("*").limit(1);
  return NextResponse.json({ data, error });
}
