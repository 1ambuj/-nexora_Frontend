"use client";

import ScreenLoader from "@/components/loader/ScreenLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DisplayAddress from "@/features/address/component/DisplayAddress";
import { useCreateOrder } from "@/hooks/mutation/order";
import { useGetPrimaryAddress } from "@/hooks/query/address";
import { useGetCart } from "@/hooks/query/cart";
import { PaymentMethod } from "@/services/order/order";
import { Banknote, CreditCard, Smartphone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const paymentOptions: {
  value: PaymentMethod;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: <Banknote className="h-5 w-5" />,
  },
  {
    value: "upi",
    label: "UPI",
    description: "Google Pay, PhonePe, Paytm & more",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    value: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay",
    icon: <CreditCard className="h-5 w-5" />,
  },
];

const Payment = () => {
  const router = useRouter();
  const { data: addressData, isLoading: addressLoading } = useGetPrimaryAddress();
  const { data: cartData, isLoading: cartLoading } = useGetCart();
  const createOrder = useCreateOrder();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [processingPayment, setProcessingPayment] = useState(false);

  const { subtotal, shippingFee, totalAmount, itemCount } = useMemo(() => {
    let subtotal = 0;
    let itemCount = 0;

    if (cartData?.items?.length) {
      for (const item of cartData.items) {
        if (item.product) {
          subtotal += item.product.variations.price * item.quantity;
          itemCount += item.quantity;
        }
      }
    }

    const shippingFee = subtotal >= 999 ? 0 : 50;
    return { subtotal, shippingFee, totalAmount: subtotal + shippingFee, itemCount };
  }, [cartData]);

  async function simulateOnlinePayment(): Promise<boolean> {
    if (paymentMethod === "upi" && !upiId.trim()) {
      return false;
    }
    if (
      paymentMethod === "card" &&
      (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim())
    ) {
      return false;
    }

    setProcessingPayment(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessingPayment(false);
    return true;
  }

  async function handlePlaceOrder() {
    if (!addressData?.address) {
      router.push("/address/add");
      return;
    }

    if (!cartData?.items?.length) {
      router.push("/shopping-bag");
      return;
    }

    if (paymentMethod !== "cod") {
      const paid = await simulateOnlinePayment();
      if (!paid) return;
    }

    createOrder.mutate({
      address: addressData.address,
      paymentMethod,
    });
  }

  const isLoading = addressLoading || cartLoading;
  const isPayDisabled =
    createOrder.isPending ||
    processingPayment ||
    !addressData ||
    !cartData?.items?.length ||
    (paymentMethod === "upi" && !upiId.trim()) ||
    (paymentMethod === "card" &&
      (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim()));

  return (
    <>
      <div className="max-w-2xl mx-auto space-y-6">
        {!addressData ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <p className="font-medium">Delivery address required</p>
            <p className="mt-1 text-amber-800">
              Add an address before completing payment.
            </p>
            <Link href="/address/add" className="mt-4 inline-block">
              <Button size="sm" className="rounded-full">
                Add address
              </Button>
            </Link>
          </div>
        ) : (
          <section className="rounded-2xl border border-neutral-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 mb-3">
              Deliver to
            </p>
            <DisplayAddress
              address={addressData.address}
              id={addressData.id}
              isPrimary={addressData.isPrimary}
              type={addressData.type}
              selectedAddress={addressData.id}
            />
          </section>
        )}

        <section className="rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 mb-4">
            Payment method
          </p>

          <RadioGroup
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
            className="space-y-3"
          >
            {paymentOptions.map((option) => (
              <label
                key={option.value}
                htmlFor={option.value}
                className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
                  paymentMethod === option.value
                    ? "border-neutral-900 bg-neutral-50"
                    : "border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-600">{option.icon}</span>
                    <span className="font-medium text-neutral-900">{option.label}</span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">{option.description}</p>
                </div>
              </label>
            ))}
          </RadioGroup>

          {paymentMethod === "upi" && (
            <div className="mt-4 space-y-2">
              <Label htmlFor="upi-id">UPI ID</Label>
              <Input
                id="upi-id"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
              <p className="text-xs text-neutral-500">
                Demo mode — payment is simulated, no real charge.
              </p>
            </div>
          )}

          {paymentMethod === "card" && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="card-number">Card number</Label>
                <Input
                  id="card-number"
                  placeholder="4111 1111 1111 1111"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-expiry">Expiry</Label>
                <Input
                  id="card-expiry"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-cvv">CVV</Label>
                <Input
                  id="card-cvv"
                  placeholder="123"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                />
              </div>
              <p className="sm:col-span-2 text-xs text-neutral-500">
                Demo mode — use any test values. No real payment is processed.
              </p>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 mb-4">
            Order summary
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Items ({itemCount})</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Shipping</span>
              <span className={shippingFee === 0 ? "text-green-600" : ""}>
                {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
              </span>
            </div>
            {subtotal > 0 && subtotal < 999 && (
              <p className="text-xs text-neutral-500">
                Add ₹{(999 - subtotal).toLocaleString()} more for free shipping
              </p>
            )}
            <div className="flex justify-between border-t border-neutral-200 pt-3 font-semibold text-base">
              <span>Total</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </section>

        <Button
          onClick={handlePlaceOrder}
          disabled={isPayDisabled}
          className="w-full rounded-full h-12 uppercase bg-neutral-950 hover:bg-neutral-800"
          size="lg"
        >
          {processingPayment
            ? "Processing payment..."
            : createOrder.isPending
              ? "Placing order..."
              : paymentMethod === "cod"
                ? "Place order"
                : `Pay ₹${totalAmount.toLocaleString()}`}
        </Button>
      </div>

      <ScreenLoader open={isLoading || createOrder.isPending || processingPayment} />
    </>
  );
};

export default Payment;
