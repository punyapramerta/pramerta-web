import type { MetadataRoute } from "next";
import { portfolioData, productsData } from "@/lib/repositories/dataRepository";

const BASE_URL = "https://www.pramerta.co.id";

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamicPortfolioUrls = portfolioData.map((project) => ({
    url: `${BASE_URL}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const dynamicProductUrls = productsData.map((product) => ({
    url: `${BASE_URL}${product.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...dynamicProductUrls,
    ...dynamicPortfolioUrls,
  ];
}
