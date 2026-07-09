"use client";

import ScreenLoader from "@/components/loader/ScreenLoader";
import { Button } from "@/components/ui/button";
import DisplayAddress from "@/features/address/component/DisplayAddress";
import {
  useDeleteAddressByUserIds,
  useUpdateAddressIsPrimary,
} from "@/hooks/mutation/address";
import { useGetAddressList } from "@/hooks/query/address";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import { cn } from "@/utils/helper";

let prevAddress = "";

const SelectAddressPage = () => {
  const { data: addressData, isLoading } = useGetAddressList();
  const addressMutation = useUpdateAddressIsPrimary();
  const deleteAddressMutation = useDeleteAddressByUserIds();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [deletedAddressIdsList, setDeletedAddressIdsList] = useState<string[]>(
    []
  );

  function handleSubmit() {
    if (!selectedAddress) {
      toast({ variant: "destructive", title: "Select one address" });
      return;
    }

    if (deletedAddressIdsList.length !== 0) {
      deleteAddressMutation.mutate({ ids: deletedAddressIdsList });
    }
    if (prevAddress !== selectedAddress) {
      addressMutation.mutate({ id: selectedAddress, isPrimary: true });
    }

    router.push("/address");
  }

  function handleRemoveAddress(id: string) {
    if (selectedAddress === id) {
      setSelectedAddress("");
    }
    setDeletedAddressIdsList((prev) => [...prev, id]);
  }

  useEffect(() => {
    const primary =
      addressData?.find((item) => item.isPrimary) ?? addressData?.[0];
    if (primary) {
      prevAddress = primary.id;
      setSelectedAddress(primary.id);
    }
  }, [addressData]);

  const visibleAddresses =
    addressData?.filter((item) => !deletedAddressIdsList.includes(item.id)) ??
    [];

  return (
    <div className="mx-auto w-full max-w-2xl pb-28">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="home-display text-2xl font-semibold tracking-tight text-neutral-950">
            Saved addresses
          </p>
          <p className="text-sm text-neutral-500">
            Choose a delivery address for this order.
          </p>
        </div>
        <Link href="/address/add">
          <Button variant="outline" className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Add new
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {visibleAddresses.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedAddress(item.id)}
            className="w-full text-left"
          >
            <DisplayAddress
              selectedAddress={selectedAddress}
              {...item}
              className={cn(
                selectedAddress === item.id &&
                  "border-neutral-900 ring-1 ring-neutral-900/10"
              )}
            >
              {selectedAddress === item.id ? (
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRemoveAddress(item.id);
                    }}
                    variant="outline"
                    className="rounded-full"
                  >
                    Remove
                  </Button>
                  <Link
                    href={`/address/edit/${item.id}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Button variant="outline" className="rounded-full">
                      Edit
                    </Button>
                  </Link>
                </div>
              ) : null}
            </DisplayAddress>
          </button>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-neutral-200 bg-white/95 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-2xl">
          <Button
            onClick={handleSubmit}
            className="h-12 w-full rounded-full bg-neutral-950 text-base hover:bg-neutral-800"
            size="lg"
          >
            <Check className="mr-2 h-4 w-4" />
            Confirm address
          </Button>
        </div>
      </div>

      <ScreenLoader
        open={
          isLoading ||
          addressMutation.isPending ||
          deleteAddressMutation.isPending
        }
      />
    </div>
  );
};

export default SelectAddressPage;
