import { createServerClient, isSupabaseConfigured } from "./server";

export type Testimonial = {
  stars: number;
  quote: string;
  name: string;
  title: string;
  company: string;
};

export type Product = {
  slug: string;
  category: string;
  badge: string;
  badgeClass: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  imageCover: boolean;
  href: string;
  details: { label: string; value: string }[];
};

export type ClientLogo = {
  name: string;
  image: string;
};

export type Certification = {
  name: string;
  subtitle: string;
  icon: string;
  description: string;
};

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("stars, quote, name, title, company")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data as Testimonial[];
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("slug, category, badge, badge_class, name, description, image_url, image_alt, href, details")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data as {
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
  }[]).map((row) => ({
    slug: row.slug,
    category: row.category,
    badge: row.badge,
    badgeClass: row.badge_class,
    name: row.name,
    description: row.description,
    image: row.image_url,
    imageAlt: row.image_alt,
    imageCover: false,
    href: row.href,
    details: row.details ?? [],
  }));
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("client_logos")
    .select("name, image_url")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data as { name: string; image_url: string }[]).map((row) => ({
    name: row.name,
    image: row.image_url,
  }));
}

export async function getCertifications(): Promise<Certification[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("name, subtitle, icon, description")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data as Certification[];
}
