export const SITE_NAME = "Nexora";
export const SITE_DESCRIPTION =
  "Discover curated streetwear, elevated essentials, and modern fashion at Nexora.";

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://nexora-frontend-x8xl.vercel.app"
  ).replace(/\/$/, "");
}
