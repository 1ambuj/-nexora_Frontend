import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./globals.css";
import ReactQueryProvider from "@/components/provider/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"
  ),
  title: "Nexora",
  description: "Discover trendy outfits and elevate your style with Nexora.",
  openGraph: {
    title: "Nexora — Fashion for Every Mood",
    description:
      "Explore our latest collection of streetwear, casual, and formal outfits. Shop now and redefine your wardrobe.",
    url: "https://nexora.vercel.app/",
    siteName: "Nexora",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Nexora — Trendy Clothing",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora — Style Starts Here",
    description:
      "Shop the latest fashion trends at Nexora. Outfits that speak your style.",
    images: ["/logo.png"],
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
