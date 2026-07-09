import { addToCartApi } from "./cart";

type LocalCartItem = {
  cartId: string;
  productCode: string;
  size: string;
  quantity: number;
};

export async function syncOfflineCartToServer(items: LocalCartItem[]) {
  if (!items.length) return;

  for (const item of items) {
    try {
      await addToCartApi({
        item: {
          productCode: item.productCode,
          size: item.size,
          quantity: item.quantity,
        },
      });
    } catch {
      // Item may already exist on the server cart — safe to continue.
    }
  }
}
