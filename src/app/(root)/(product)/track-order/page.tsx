"use client";

import ScreenLoader from "@/components/loader/ScreenLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetOrders } from "@/hooks/query/order";
import { IOrder } from "@/services/order/order";
import { useBoundStore } from "@/store/store";
import { Package } from "lucide-react";
import Link from "next/link";

const paymentMethodLabel: Record<string, string> = {
  cod: "Cash on Delivery",
  upi: "UPI",
  card: "Card",
};

const statusColor: Record<string, string> = {
  confirmed: "border-green-200 text-green-700 bg-green-50",
  pending: "border-amber-200 text-amber-700 bg-amber-50",
};

function OrderCard({ order }: { order: IOrder }) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-neutral-500 uppercase tracking-wide">Order</p>
          <p className="font-mono text-sm font-medium text-neutral-900 mt-0.5">
            #{order.id.slice(-8).toUpperCase()}
          </p>
          {order.createdAt && (
            <p className="text-xs text-neutral-500 mt-1">{order.createdAt}</p>
          )}
        </div>
        <Badge
          variant="outline"
          className={statusColor[order.orderStatus] ?? "border-neutral-200"}
        >
          {order.orderStatus}
        </Badge>
      </div>

      <div className="mt-4 grid gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-500">Total</span>
          <span className="font-semibold">₹{order.totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">Payment</span>
          <span>{paymentMethodLabel[order.paymentMethod] ?? order.paymentMethod}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">Deliver to</span>
          <span className="text-right max-w-[60%] truncate">
            {order.address.city}, {order.address.pincode}
          </span>
        </div>
      </div>
    </article>
  );
}

const TrackOrderPage = () => {
  const token = useBoundStore((state) => state.token);
  const { data: orders, isLoading, isError } = useGetOrders();

  if (!token) {
    return (
      <div className="home-container py-10">
        <div className="max-w-lg mx-auto rounded-2xl border border-neutral-200 bg-white p-10 text-center">
          <h2 className="font-semibold text-neutral-900">Sign in to track orders</h2>
          <p className="text-sm text-neutral-500 mt-2">
            Log in to view your order history and delivery status.
          </p>
          <Link href="/login" className="mt-6 inline-block">
            <Button className="rounded-full bg-neutral-950 hover:bg-neutral-800">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="home-display text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
            Orders
          </p>
          <h1 className="home-display text-2xl font-semibold text-neutral-950 mt-1">
            Track your orders
          </h1>
        </div>

        {isLoading ? null : isError || !orders?.length ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
              <Package className="h-7 w-7 text-neutral-500" />
            </div>
            <h2 className="font-semibold text-neutral-900">No orders yet</h2>
            <p className="text-sm text-neutral-500 mt-2">
              Place your first order to see it here.
            </p>
            <Link href="/" className="mt-6 inline-block">
              <Button className="rounded-full bg-neutral-950 hover:bg-neutral-800">
                Start shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>

      <ScreenLoader open={isLoading} />
    </div>
  );
};

export default TrackOrderPage;
