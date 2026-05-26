"use server";

import { revalidatePath } from "next/cache";
import { createServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { PortfolioItem } from "@/lib/repositories/dataRepository";

// ─── DB row ↔ PortfolioItem mappers ──────────────────────────

type PortfolioRow = {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string | null;
  location: string | null;
  excerpt: string | null;
  image_placeholder: string | null;
  image_url: string | null;
  image_note: string | null;
  background: string | null;
  highlight_challenge: string | null;
  challenges: string[] | null;
  solution: string[] | null;
  results: string[] | null;
  metrics: { label: string; value: string }[] | null;
  created_at: string;
  updated_at: string;
};

function rowToItem(row: PortfolioRow): PortfolioItem {
  return {
    slug: row.slug,
    title: row.title,
    client: row.client,
    industry: row.industry ?? "",
    location: row.location ?? "",
    excerpt: row.excerpt ?? "",
    imagePlaceholder: row.image_placeholder ?? "hvac",
    image: row.image_url ?? undefined,
    imageNote: row.image_note ?? undefined,
    background: row.background ?? "",
    highlightChallenge: row.highlight_challenge ?? "",
    challenges: row.challenges ?? [],
    solution: row.solution ?? [],
    results: row.results ?? [],
    metrics: row.metrics ?? [],
  };
}

function itemToRow(item: PortfolioItem): Omit<PortfolioRow, "id" | "created_at" | "updated_at"> {
  return {
    slug: item.slug,
    title: item.title,
    client: item.client,
    industry: item.industry,
    location: item.location,
    excerpt: item.excerpt,
    image_placeholder: item.imagePlaceholder,
    image_url: item.image ?? null,
    image_note: item.imageNote ?? null,
    background: item.background,
    highlight_challenge: item.highlightChallenge,
    challenges: item.challenges,
    solution: item.solution,
    results: item.results,
    metrics: item.metrics,
  };
}

// ─── Public actions ───────────────────────────────────────────

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data as PortfolioRow[]).map(rowToItem);
}

export async function addPortfolioItem(item: PortfolioItem) {
  const supabase = createServerClient();
  const { error } = await supabase.from("portfolios").insert(itemToRow(item));
  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updatePortfolioItem(slug: string, item: PortfolioItem) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("portfolios")
    .update(itemToRow(item))
    .eq("slug", slug);
  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deletePortfolioItem(slug: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from("portfolios").delete().eq("slug", slug);
  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
