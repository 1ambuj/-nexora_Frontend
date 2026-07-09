import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./globals.css";
import ReactQueryProvider from "@/components/provider/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} — Fashion for Every Mood`,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Style Starts Here`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <body className={`${roboto.className} antialiased`}>
          {children}
          <Toaster />
        </body>
      </ReactQueryProvider>
    </html>
  );
}
