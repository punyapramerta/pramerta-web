"use server";

import { revalidatePath } from "next/cache";
import { createServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type AdminClientLogo = {
  id: string;
  name: string;
  image_url: string;
  sort_order: number;
};

export async function getAdminClientLogos(): Promise<AdminClientLogo[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createServerClient();
  try {
    const { data, error } = await supabase
      .from("client_logos")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return data as AdminClientLogo[];
  } catch (err) {
    console.error("Failed to fetch admin client logos:", err);
    return [];
  }
}

export async function addClientLogo(name: string, imageUrl: string) {
  const supabase = createServerClient();
  
  // Get max sort_order
  const { data: maxData } = await supabase
    .from("client_logos")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
    
  let nextSortOrder = 1;
  if (maxData && maxData.length > 0) {
    nextSortOrder = (maxData[0].sort_order || 0) + 1;
  }

  const { error } = await supabase.from("client_logos").insert({
    name,
    image_url: imageUrl,
    sort_order: nextSortOrder
  });

  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteClientLogo(id: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from("client_logos").delete().eq("id", id);
  
  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
