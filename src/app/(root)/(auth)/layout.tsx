import RouteNavbar from "@/components/navbar/RouteNavbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen bg-neutral-50">
      <RouteNavbar />
      <div className="home-container flex min-h-[calc(100vh-60px)] items-center justify-center px-4 py-10">
        {children}
      </div>
    </main>
  );
}
