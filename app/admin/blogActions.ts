"use server";

import { revalidatePath } from "next/cache";
import { createServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  author: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  metaTitle: string;
  metaDesc: string;
  targetKeyword: string;
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt?: string;
};

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  read_time: string | null;
  author: string | null;
  content: string | null;
  excerpt: string | null;
  image_url: string | null;
  meta_title: string | null;
  meta_desc: string | null;
  target_keyword: string | null;
  status: string | null;
  published_at: string | null;
  created_at: string;
};

function rowToPost(row: BlogRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category ?? "",
    readTime: row.read_time ?? "",
    author: row.author ?? "Tim Engineer PAS HVAC",
    content: row.content ?? "",
    excerpt: row.excerpt ?? "",
    imageUrl: row.image_url ?? undefined,
    metaTitle: row.meta_title ?? "",
    metaDesc: row.meta_desc ?? "",
    targetKeyword: row.target_keyword ?? "",
    status: (row.status === "published" ? "published" : "draft") as "draft" | "published",
    publishedAt: row.published_at,
    createdAt: row.created_at,
  };
}

function postToRow(post: BlogPost): Omit<BlogRow, "id" | "created_at"> {
  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    read_time: post.readTime,
    author: post.author,
    content: post.content,
    excerpt: post.excerpt,
    image_url: post.imageUrl ?? null,
    meta_title: post.metaTitle,
    meta_desc: post.metaDesc,
    target_keyword: post.targetKeyword,
    status: post.status,
    published_at: post.status === "published" ? (post.publishedAt ?? new Date().toISOString()) : null,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createServerClient();
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data as BlogRow[]).map(rowToPost);
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
    return [];
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createServerClient();
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data as BlogRow[]).map(rowToPost);
  } catch (err) {
    console.error("Failed to fetch published blog posts:", err);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createServerClient();
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error) throw new Error(error.message);
    return rowToPost(data as BlogRow);
  } catch (err) {
    console.error(`Failed to fetch blog post by slug ${slug}:`, err);
    return null;
  }
}

export async function addBlogPost(post: BlogPost) {
  const supabase = createServerClient();
  const { error } = await supabase.from("blog_posts").insert(postToRow(post));
  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateBlogPost(slug: string, post: BlogPost) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("blog_posts")
    .update(postToRow(post))
    .eq("slug", slug);
  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteBlogPost(slug: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from("blog_posts").delete().eq("slug", slug);
  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function toggleBlogPostStatus(slug: string, currentStatus: "draft" | "published") {
  const supabase = createServerClient();
  const newStatus = currentStatus === "published" ? "draft" : "published";
  const { error } = await supabase
    .from("blog_posts")
    .update({
      status: newStatus,
      published_at: newStatus === "published" ? new Date().toISOString() : null,
    })
    .eq("slug", slug);
  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
