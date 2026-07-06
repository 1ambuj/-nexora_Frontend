import { GET_CART_DETAILS, GET_ORDERS, GET_TOTAL_CART_COUNT } from "@/constants/reactquery";
import { toast } from "@/hooks/use-toast";
import { createOrderApi, ICreateOrderApi } from "@/services/order/order";
import { useBoundStore } from "@/store/store";
import { getMutationErrorMsg } from "@/utils/errors/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setTotalCartItem = useBoundStore((state) => state.setTotalCartItem);

  return useMutation({
    mutationFn: (payload: ICreateOrderApi) => createOrderApi(payload),
    onSuccess: (data) => {
      const orderId = data?.data?.orderId;
      setTotalCartItem(0);
      queryClient.invalidateQueries({ queryKey: [GET_CART_DETAILS] });
      queryClient.invalidateQueries({ queryKey: [GET_TOTAL_CART_COUNT] });
      queryClient.invalidateQueries({ queryKey: [GET_ORDERS] });

      toast({
        title: "Order placed successfully",
      });

      if (orderId) {
        router.push(`/order-success?orderId=${orderId}`);
      } else {
        router.push("/order-success");
      }
    },
    onError: (error) => {
      const { msg } = getMutationErrorMsg(error, "Order");
      toast({
        title: msg,
        variant: "destructive",
      });
    },
  });
};
