"use client";

import RouteNavbar from "@/components/navbar/RouteNavbar";
import CircleStepper from "@/components/stepper/circle-stepper";
import { usePathname } from "next/navigation";

const steps = [
  { label: "Bag", id: 1 },
  { label: "Address", id: 2 },
  { label: "Payment", id: 3 },
];

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  function getStep(pathname: string): number {
    if (pathname === "/shopping-bag") {
      return 1;
    } else if (pathname.includes("address")) {
      return 2;
    } else if (pathname === "/payment") {
      return 3;
    }
    return 0;
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <RouteNavbar />
      <section className="home-container py-6">
        <CircleStepper steps={steps} curStep={getStep(pathname)} />
      </section>
      <div className="home-container pb-12">{children}</div>
    </main>
  );
}
