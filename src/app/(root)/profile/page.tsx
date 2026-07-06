"use client";

import { Button } from "@/components/ui/button";
import { useBoundStore } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const logout = useBoundStore((state) => state.logout);

  async function handleLogout() {
    logout();
    router.replace("/");
  }

  return (
    <div className="home-container py-10">
      <div className="max-w-lg mx-auto rounded-2xl border border-neutral-200/70 bg-white p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] space-y-6">
        <div>
          <p className="home-display text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
            Account
          </p>
          <h1 className="home-display text-2xl font-semibold text-neutral-950 mt-1">
            Your profile
          </h1>
        </div>

        <Link
          href="/profile/details"
          className="flex items-center justify-between rounded-xl border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition-colors"
        >
          Edit profile details
          <span aria-hidden>→</span>
        </Link>

        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full rounded-full h-11 border-neutral-200"
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
