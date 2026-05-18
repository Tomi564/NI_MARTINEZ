const DEFAULT_SITE_URL = "https://xn--neumaticos-importados-4mb.com.ar";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return raw.trim().replace(/\/$/, "");
}

/** metadataBase de Next requiere `new URL()`; punycode puede fallar en algunos runtimes. */
export function getMetadataBase(): URL | undefined {
  try {
    return new URL(getSiteUrl());
  } catch {
    return undefined;
  }
}
