import { Badge } from "@/components/ui/badge";
import { IResGetAddressApi } from "@/services/user/address";
import { ReactNode } from "react";
import { cn } from "@/utils/helper";

type IDisplayAddress = IResGetAddressApi & {
  selectedAddress: string;
  hideRadio?: boolean;
  children?: ReactNode;
  className?: string;
};

const DisplayAddress = (props: IDisplayAddress) => {
  const isSelected = props.id === props.selectedAddress;

  return (
    <div
      className={cn(
        "rounded-2xl border bg-white p-5 shadow-sm transition-colors",
        isSelected
          ? "border-neutral-900 ring-1 ring-neutral-900/10"
          : "border-neutral-200/80",
        props.className
      )}
    >
      <label htmlFor={props.id} className="block w-full cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-neutral-950">{props.address.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {props.address.address}
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              {props.address.city}, {props.address.state} {props.address.pincode}
            </p>
          </div>
          <Badge
            variant="outline"
            className="shrink-0 rounded-full border-neutral-300 uppercase text-neutral-700"
          >
            {props.type}
          </Badge>
        </div>

        {(isSelected || props.hideRadio) && (
          <p className="mt-4 text-sm text-neutral-600">
            <span className="text-neutral-400">Mobile:</span>{" "}
            {props.address.mobileNo}
          </p>
        )}

        {props.children ? <div className="mt-4">{props.children}</div> : null}
      </label>
    </div>
  );
};

export default DisplayAddress;
