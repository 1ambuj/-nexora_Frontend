import axiosInstance from "@/lib/axios/protectedInstance";

export type PaymentMethod = "cod" | "upi" | "card";

export type IOrderAddress = {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  mobileNo: string;
  alternateMobileNo?: string;
};

export type ICreateOrderApi = {
  address: IOrderAddress;
  paymentMethod: PaymentMethod;
};

export type IOrder = {
  id: string;
  totalPrice: number;
  shippingPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  address: IOrderAddress;
  createdAt?: string;
};

export const createOrderApi = async (payload: ICreateOrderApi) => {
  const data = await axiosInstance.post(`/order`, payload);
  return data;
};

export const getOrdersApi = async () => {
  const data = await axiosInstance.get(`/order`);
  return data;
};

export const getOrderApi = async (orderId: string) => {
  const data = await axiosInstance.get(`/order/${orderId}`);
  return data;
};
