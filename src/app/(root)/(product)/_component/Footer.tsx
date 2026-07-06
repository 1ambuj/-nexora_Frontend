"use client";

import Link from "next/link";

const footerLinks = {
  shop: [
    { label: "Men", href: "/search?gender=men" },
    { label: "Hoodies", href: "/search?category=hoodies" },
    { label: "T-Shirts", href: "/search?category=t-shirts" },
    { label: "Joggers", href: "/search?category=joggers" },
    { label: "New Arrivals", href: "/search?collection=latest" },
  ],
  support: [
    { label: "Track Order", href: "/track-order" },
    { label: "Returns", href: "/returns" },
    { label: "Contact", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
  ],
  company: [
    { label: "Shipping", href: "/shipping-policy" },
    { label: "Privacy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white border-t border-white/8">
      <div className="home-container py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <p className="home-display text-xl font-bold tracking-[0.12em]">
              NEXORA
            </p>
            <p className="mt-3 text-sm text-white/45 leading-relaxed max-w-xs">
              Future-forward streetwear for the next generation. Designed by
              Nexora. Built for now.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.24em] text-white/35 mb-4 font-medium">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.24em] text-white/35 mb-4 font-medium">
              Support
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.24em] text-white/35 mb-4 font-medium">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-2 text-[11px] text-white/35">
          <p>© 2028 Nexora. All rights reserved.</p>
          <p className="uppercase tracking-[0.18em]">
            Prototype — demonstration only
          </p>
        </div>
      </div>
    </footer>
  );
}
