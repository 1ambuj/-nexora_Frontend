import { GET_ORDER, GET_ORDERS } from "@/constants/reactquery";
import { getOrderApi, getOrdersApi, IOrder } from "@/services/order/order";
import { useBoundStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = () => {
  const token = useBoundStore((state) => state.token);

  return useQuery<IOrder[], Error>({
    queryKey: [GET_ORDERS],
    queryFn: async () => {
      const data = await getOrdersApi();
      return data?.data ?? [];
    },
    enabled: !!token,
  });
};

export const useGetOrder = (orderId: string) => {
  return useQuery<IOrder, Error>({
    queryKey: [GET_ORDER, orderId],
    queryFn: async () => {
      const data = await getOrderApi(orderId);
      return data?.data;
    },
    enabled: !!orderId,
  });
};
