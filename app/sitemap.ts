import type { MetadataRoute } from "next";
import { marcasData } from "@/lib/marcas-data";
import { MEDIDAS_POPULARES_SLUGS } from "@/lib/medidas";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const medidaRoutes = MEDIDAS_POPULARES_SLUGS.map((slug) => ({
    url: `${siteUrl}/neumaticos/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const marcaRoutes = marcasData.map((m) => ({
    url: `${siteUrl}/marcas/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/marcas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...medidaRoutes,
    ...marcaRoutes,
  ];
}
