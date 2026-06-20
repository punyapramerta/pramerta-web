import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/supabase/queries";
import ProductView from "@/components/products/ProductView";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const products = await getProducts();
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return { title: "Product Not Found | PAS HVAC" };
  }

  const title = product.metaTitle || `${product.name} | PAS HVAC Surabaya`;
  const description = product.metaDesc || product.description;

  return {
    title,
    description,
    keywords: product.targetKeyword ? [product.targetKeyword] : [product.name, "HVAC Indonesia"],
    alternates: { canonical: `https://www.pramerta.co.id/products/${product.slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.pramerta.co.id/products/${product.slug}`,
      images: product.image ? [{ url: product.image, alt: product.imageAlt || product.name }] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const products = await getProducts();
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Ambil 3 produk lainnya untuk direkomendasikan
  const otherProducts = products.filter(p => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <ProductView product={product} otherProducts={otherProducts} hideNavigation={false} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "brand": { "@type": "Brand", "name": product.badge || "PAS HVAC" },
            "image": product.image || undefined,
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "areaServed": "ID",
              "seller": {
                "@type": "Organization",
                "name": "PT. Pratama Amerta Solusi",
                "url": "https://www.pramerta.co.id",
              },
            },
          }),
        }}
      />
    </>
  );
}
