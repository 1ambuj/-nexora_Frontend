import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Drawer,
  DrawerDescription,
} from "@/components/ui/drawer";
import { cn, generateRandomNumber, getDiscountOnPrice } from "@/utils/helper";
import React, { useState } from "react";
import ProductSize from "./ProductSize";
import { IVariation } from "@/types/api";
import { useAddToCart } from "@/hooks/mutation/cart";
import { IAddCartApiCartItem } from "@/services/product/cart";
import { useBoundStore } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { ERROR_STATUS } from "@/utils/errors/errors";
import { Check, ShoppingBag } from "lucide-react";

const AddtoCart = ({
  size,
  handleSizeChange,
  variations,
  price,
  discount,
  item,
}: {
  size: string | null;
  handleSizeChange(field: string, val: string): void;
  setScreenLoader?: (val: boolean) => void;
  variations: IVariation[];
  price: number;
  discount: number;
  item?: IAddCartApiCartItem | null;
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const token = useBoundStore((state) => state.token);
  const addToCartFn = useBoundStore((state) => state.addToCart);
  const { toast } = useToast();

  const mutation = useAddToCart();

  function handleOpenDrawer(open: boolean, selectedSize: string | null) {
    if (selectedSize === null) {
      setOpenDrawer(open);
    } else if (!open) {
      setOpenDrawer(false);
    }
  }

  function showAddedFeedback() {
    setJustAdded(true);
    setOpenDrawer(false);
    window.setTimeout(() => setJustAdded(false), 2000);
  }

  function addToCart() {
    if (!size || !item) return;

    if (token) {
      mutation.mutate(
        { item },
        {
          onSuccess: () => showAddedFeedback(),
        }
      );
      return;
    }

    const cartItem = {
      cartId: `C-${generateRandomNumber(5)}`,
      productCode: item.productCode,
      size: item.size,
      quantity: item.quantity,
    };
    const res = addToCartFn(cartItem);
    if (res === -1) {
      toast({
        title: "Added to bag",
        description: "Sign in at checkout to save your cart across devices.",
      });
      showAddedFeedback();
    } else if (res === ERROR_STATUS.ALREADY_EXIST) {
      toast({
        title: "Already in your bag",
        variant: "destructive",
      });
    }
  }

  const needsSize = size === null;

  return (
    <Drawer
      open={openDrawer}
      onOpenChange={(open) => handleOpenDrawer(open, size)}
    >
      <DrawerTrigger asChild>
        <section className="sticky top-[92%] sm:block sm:top-0 mt-4 px-1">
          <AddToCartButton
            handleOnClick={needsSize ? undefined : addToCart}
            added={justAdded}
            label={needsSize ? "Select size & add" : "Add to bag"}
          />
        </section>
      </DrawerTrigger>
      <DrawerContent className="rounded-t-3xl">
        <div className="mx-auto w-full max-w-sm px-4 pb-8">
          <DrawerHeader className="text-left px-0">
            <DrawerTitle className="home-display text-xl">Choose your size</DrawerTitle>
            <DrawerDescription>
              Pick a size to add this item to your bag.
            </DrawerDescription>
          </DrawerHeader>
          <ProductSize
            className="mt-2"
            handleChange={handleSizeChange}
            size={size}
            variations={variations}
          />
          {size && (
            <div className="mt-5 flex items-baseline gap-2 rounded-xl bg-neutral-50 px-4 py-3">
              <p className="text-lg font-semibold text-neutral-950">₹{price}</p>
              {discount > 0 && (
                <p className="text-sm font-medium text-emerald-600">
                  ₹{getDiscountOnPrice(price, discount)} off
                </p>
              )}
            </div>
          )}
          <AddToCartButton
            handleOnClick={addToCart}
            disabled={!size}
            added={justAdded}
            className="mt-6"
            label="Add to bag"
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const AddToCartButton = ({
  className,
  disabled,
  handleOnClick,
  added,
  label = "Add to bag",
}: {
  className?: string;
  disabled?: boolean;
  handleOnClick?: () => void;
  added?: boolean;
  label?: string;
}) => {
  return (
    <Button
      size="lg"
      onClick={handleOnClick}
      disabled={disabled || added}
      className={cn(
        "w-full max-w-full rounded-full h-12 text-base font-medium shadow-sm transition-all",
        added
          ? "bg-emerald-600 hover:bg-emerald-600 text-white"
          : "bg-neutral-950 hover:bg-neutral-800",
        className
      )}
    >
      {added ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Added to bag
        </>
      ) : (
        <>
          <ShoppingBag className="mr-2 h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
};

export default AddtoCart;
