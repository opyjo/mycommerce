import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { CartItem, ShippingAddress } from "../types/Carts";
import { Order } from "../types/Order";

interface PaypalClientResponse {
  clientId: string;
}

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: {
      orderItems: CartItem[];
      shippingAddress: ShippingAddress;
      paymentMethod: string;
      itemsPrice: number;
      shippingPrice: number;
      taxPrice: number;
      totalPrice: number;
    }) =>
      (
        await apiClient.post<{ message: string; order: Order }>(
          `api/orders`,
          order
        )
      ).data,
  });

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery<Order, Error>({
    queryKey: ["orders", id],
    queryFn: async () => {
      const response = await apiClient.get<Order>(`api/orders/${id}`);
      return response.data;
    },
  });

// the function of the below hook is to get the paypal client id
export const useGetPaypalClientIdQuery = () =>
  useQuery<PaypalClientResponse, Error>({
    queryKey: ["paypal-clientId"],
    queryFn: async () => {
      const response = await apiClient.get<PaypalClientResponse>(
        `/api/keys/paypal`
      );
      return response.data;
    },
  });

export const usePayOrderMutation = () =>
  useMutation({
    mutationFn: async (details: { orderId: string }) =>
      (
        await apiClient.put<{ message: string; order: Order }>(
          `api/orders/${details.orderId}/pay`,
          details
        )
      ).data,
  });

export const useGetOrderHistoryQuery = () =>
  useQuery({
    queryKey: ["order-history"],
    queryFn: async () => {
      const response = await apiClient.get<Order[]>(`api/orders/mine`);
      return response.data;
    },
  });
