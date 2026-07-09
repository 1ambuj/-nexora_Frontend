"use client";

import ScreenLoader from "@/components/loader/ScreenLoader";
import { Button } from "@/components/ui/button";
import DisplayAddress from "@/features/address/component/DisplayAddress";
import { useGetPrimaryAddress } from "@/hooks/query/address";
import Link from "next/link";
import { MapPin, Plus } from "lucide-react";

const AddressPage = () => {
  const { data: addressData, isLoading } = useGetPrimaryAddress();

  return (
    <div className="mx-auto w-full max-w-2xl pb-28">
      <div className="mb-6 space-y-1">
        <p className="home-display text-2xl font-semibold tracking-tight text-neutral-950">
          Delivery address
        </p>
        <p className="text-sm text-neutral-500">
          Confirm where your order should be delivered.
        </p>
      </div>

      {!addressData ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700">
            <MapPin className="h-6 w-6" />
          </div>
          <p className="font-medium text-neutral-900">No saved address yet</p>
          <p className="mt-2 text-sm text-neutral-500">
            Add a delivery address to continue checkout.
          </p>
          <Link href="/address/add" className="mt-6 inline-block">
            <Button className="rounded-full px-6">
              <Plus className="mr-2 h-4 w-4" />
              Add new address
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <DisplayAddress
            address={addressData.address}
            id={addressData.id}
            isPrimary={addressData.isPrimary}
            type={addressData.type}
            selectedAddress={addressData.id}
            hideRadio={true}
          >
            <Link href="/address/select" className="mt-4 inline-block">
              <Button variant="outline" className="rounded-full">
                Change or add address
              </Button>
            </Link>
          </DisplayAddress>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-neutral-200 bg-white/95 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-2xl">
          <Link href={addressData ? "/payment" : "/address/add"}>
            <Button
              className="h-12 w-full rounded-full bg-neutral-950 text-base hover:bg-neutral-800"
              size="lg"
              disabled={!addressData}
            >
              Continue to payment
            </Button>
          </Link>
        </div>
      </div>

      <ScreenLoader open={isLoading} />
    </div>
  );
};

export default AddressPage;
