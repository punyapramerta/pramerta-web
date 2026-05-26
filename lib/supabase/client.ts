import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Browser-safe client (anon key) — use in client components and leadService.
// Created lazily so the build doesn't fail when env vars are not set.
let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("Supabase env vars are not configured.");
    _client = createClient(url, key);
  }
  return _client;
}

// Convenience re-export for code that imports `supabase` directly.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabaseClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
