const fallbackUrl = "http://localhost:3000";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.CF_PAGES_URL ?? fallbackUrl,
);

export const siteDescription =
  "Frontend and product engineer building enterprise AI products, consumer marketplaces and independent tools, from problem framing to production.";
