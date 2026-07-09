import RouteNavbar from "@/components/navbar/RouteNavbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_45%)]"
      />
      <RouteNavbar />
      <div className="home-container relative flex min-h-[calc(100vh-60px)] items-center justify-center px-4 py-10">
        {children}
      </div>
    </main>
  );
}
