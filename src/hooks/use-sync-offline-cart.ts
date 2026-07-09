import {
  GET_CART_DETAILS,
  GET_TOTAL_CART_COUNT,
} from "@/constants/reactquery";
import { syncOfflineCartToServer } from "@/services/product/sync-cart";
import { useBoundStore } from "@/store/store";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useSyncOfflineCart() {
  const queryClient = useQueryClient();
  const clearLocalCart = useBoundStore((state) => state.clearLocalCart);

  return useCallback(async () => {
    const { cartItems, token } = useBoundStore.getState();
    if (!token || cartItems.length === 0) return false;

    await syncOfflineCartToServer(cartItems);
    clearLocalCart();

    await queryClient.invalidateQueries({ queryKey: [GET_CART_DETAILS] });
    await queryClient.invalidateQueries({ queryKey: [GET_TOTAL_CART_COUNT] });

    return true;
  }, [clearLocalCart, queryClient]);
}
