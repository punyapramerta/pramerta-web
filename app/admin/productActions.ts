"use server";

import { revalidatePath } from "next/cache";
import { createServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getProducts as getProductsQuery } from "@/lib/supabase/queries";
import type { Product } from "@/lib/supabase/queries";

export async function getProducts() {
  return getProductsQuery();
}

type ProductRow = {
  slug: string;
  category: string;
  badge: string;
  badge_class: string;
  name: string;
  description: string;
  image_url: string;
  image_alt: string;
  href: string;
  details: { label: string; value: string }[];
  content?: string | null;
  features?: any | null;
  applications?: any | null;
  faqs?: any | null;
  meta_title?: string | null;
  meta_desc?: string | null;
  target_keyword?: string | null;
};

function itemToRow(item: Product): ProductRow {
  return {
    slug: item.slug,
    category: item.category,
    badge: item.badge,
    badge_class: item.badgeClass,
    name: item.name,
    description: item.description,
    image_url: item.image,
    image_alt: item.imageAlt,
    href: item.href,
    details: item.details,
    content: item.content || null,
    features: item.features || [],
    applications: item.applications || [],
    faqs: item.faqs || [],
    meta_title: item.metaTitle || null,
    meta_desc: item.metaDesc || null,
    target_keyword: item.targetKeyword || null,
  };
}

export async function addProduct(item: Product) {
  const supabase = createServerClient();
  const { error } = await supabase.from("products").insert(itemToRow(item));
  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateProduct(slug: string, item: Product) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("products")
    .update(itemToRow(item))
    .eq("slug", slug);
  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteProduct(slug: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from("products").delete().eq("slug", slug);
  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
