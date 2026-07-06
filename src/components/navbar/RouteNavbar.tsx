"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function RouteNavbar() {
  const router = useRouter();
  const pathName = usePathname()

  function handleBack() {
    router.back();
  }

  const pageTitle = pathName.split("/")[1]?.replace(/-/g, " ") ?? "Nexora";

  return (
    <header className="w-full sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-neutral-200/60">
      <div className="home-container flex items-center gap-3 h-[60px]">
        <button
          type="button"
          onClick={handleBack}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="home-display text-sm font-semibold uppercase tracking-[0.18em] text-neutral-800 capitalize">
          {pageTitle}
        </span>
      </div>
    </header>
  );
}
