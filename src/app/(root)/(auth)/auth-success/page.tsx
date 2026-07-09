"use client";

import { ROUTES } from "@/utils/enums";
import { useBoundStore } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSyncOfflineCart } from "@/hooks/use-sync-offline-cart";
import { consumePostLoginRedirect } from "@/utils/checkout";
import ScreenLoader from "@/components/loader/ScreenLoader";

const AuthSuccess = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || null;
  const router = useRouter();
  const setLoggedIn = useBoundStore((state) => state.setLoggedIn);
  const syncOfflineCart = useSyncOfflineCart();

  useEffect(() => {
    async function completeAuth() {
      if (!token) {
        router.back();
        return;
      }

      setLoggedIn({ token });
      await syncOfflineCart();
      router.replace(consumePostLoginRedirect(ROUTES.HOME));
    }

    completeAuth();
  }, [router, setLoggedIn, syncOfflineCart, token]);

  return <ScreenLoader open />;
};

export default AuthSuccess;
