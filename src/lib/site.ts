const fallbackUrl = "http://localhost:3000";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.CF_PAGES_URL ?? fallbackUrl,
);

export const siteDescription =
  "Product-minded frontend engineer working across enterprise AI, consumer marketplaces, and independent products.";
