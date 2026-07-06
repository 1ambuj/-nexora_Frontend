"use client";

import { Button } from "@/components/ui/button";
import ScreenLoader from "@/components/loader/ScreenLoader";
import { useGetOrder } from "@/hooks/query/order";
import { CheckCircle2, Package } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const paymentMethodLabel: Record<string, string> = {
  cod: "Cash on Delivery",
  upi: "UPI",
  card: "Card",
};

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";
  const { data: order, isLoading } = useGetOrder(orderId);

  return (
    <div className="home-container py-16">
      <div className="max-w-lg mx-auto rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-9 w-9 text-green-600" />
        </div>

        <p className="home-display text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
          Thank you
        </p>
        <h1 className="home-display text-2xl font-semibold text-neutral-950 mt-2">
          Order placed successfully
        </h1>
        <p className="text-neutral-600 mt-2 text-sm">
          We&apos;ve received your order and will start processing it soon.
        </p>

        {orderId && (
          <div className="mt-6 rounded-xl bg-neutral-50 border border-neutral-200 p-4 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-500">Order ID</span>
              <span className="font-mono text-xs">{orderId.slice(-8).toUpperCase()}</span>
            </div>
            {order && (
              <>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Total paid</span>
                  <span className="font-semibold">₹{order.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Payment</span>
                  <span>{paymentMethodLabel[order.paymentMethod] ?? order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Status</span>
                  <span className="capitalize text-green-700">{order.orderStatus}</span>
                </div>
              </>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/track-order">
            <Button variant="outline" className="w-full sm:w-auto rounded-full">
              <Package className="h-4 w-4 mr-2" />
              Track orders
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full sm:w-auto rounded-full bg-neutral-950 hover:bg-neutral-800">
              Continue shopping
            </Button>
          </Link>
        </div>
      </div>

      <ScreenLoader open={isLoading && !!orderId} />
    </div>
  );
};

export default OrderSuccessPage;
