"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  addressFormSchema,
  IAddressFormFields,
} from "@/features/address/libs/validation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ADDRESS_TYPE_LIST } from "@/constants/api";
import { Checkbox } from "@/components/ui/checkbox";
import ScreenLoader from "@/components/loader/ScreenLoader";
import { useEffect } from "react";
import { cn } from "@/utils/helper";
import { Home, MapPin, Phone, Save } from "lucide-react";

type IAddressFrom = {
  isLoading: boolean;
  onSubmit(data: IAddressFormFields): void;
  defaultValue: {
    address?: Partial<IAddressFormFields["address"]>;
    type?: Partial<IAddressFormFields["type"]>;
    isPrimary?: Partial<IAddressFormFields["isPrimary"]>;
  };
  isEditable?: boolean;
};

function SectionCard({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description?: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-neutral-950">{title}</h2>
          {description ? (
            <p className="mt-1 text-xs text-neutral-500">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function AddressForm({
  onSubmit,
  isLoading,
  defaultValue,
  isEditable,
}: IAddressFrom) {
  const form = useForm<IAddressFormFields>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: defaultValue,
  });

  useEffect(() => {
    if (defaultValue && isEditable) {
      form.reset({
        address: defaultValue.address,
        isPrimary: defaultValue.isPrimary,
        type: defaultValue.type,
      });
    }
  }, [defaultValue, form, isEditable]);

  return (
    <div className="mx-auto w-full max-w-2xl pb-28">
      <div className="mb-6 space-y-1">
        <p className="home-display text-2xl font-semibold tracking-tight text-neutral-950">
          Delivery details
        </p>
        <p className="text-sm text-neutral-500">
          Add where you want your order delivered.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <SectionCard
            title="Contact"
            description="We will call on this number for delivery updates."
            icon={Phone}
          >
            <FormField
              control={form.control}
              name="address.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-neutral-500">
                    Full name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      className="h-11 rounded-xl border-neutral-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="address.mobileNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-neutral-500">
                      Mobile number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="10-digit mobile"
                        className="h-11 rounded-xl border-neutral-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.alternateMobileNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-neutral-500">
                      Alternate mobile (optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Alternate number"
                        className="h-11 rounded-xl border-neutral-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Address"
            description="House number, street, area, city and pincode."
            icon={MapPin}
          >
            <FormField
              control={form.control}
              name="address.pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-neutral-500">
                    Pincode
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="Pincode"
                      className="h-11 rounded-xl border-neutral-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-neutral-500">
                    Street address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="House no., building, street, area"
                      className="h-11 rounded-xl border-neutral-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-neutral-500">
                      City / District
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City"
                        className="h-11 rounded-xl border-neutral-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-neutral-500">
                      State
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="State"
                        className="h-11 rounded-xl border-neutral-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Save as"
            description="Choose how you want to label this address."
            icon={Home}
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-2 gap-3"
                    >
                      {ADDRESS_TYPE_LIST.map((e) => (
                        <FormItem key={e.value} className="space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value={e.value}
                              id={e.value}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <Label
                            htmlFor={e.value}
                            className={cn(
                              "flex h-11 cursor-pointer items-center justify-center rounded-xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition-colors",
                              "peer-data-[state=checked]:border-neutral-950 peer-data-[state=checked]:bg-neutral-950 peer-data-[state=checked]:text-white"
                            )}
                          >
                            {e.label}
                          </Label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPrimary"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal text-neutral-700">
                    Make this my default delivery address
                  </FormLabel>
                </FormItem>
              )}
            />
          </SectionCard>

          <div className="fixed inset-x-0 bottom-0 z-20 border-t border-neutral-200 bg-white/95 px-4 py-4 backdrop-blur-sm">
            <div className="mx-auto w-full max-w-2xl">
              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-neutral-950 text-base hover:bg-neutral-800"
              >
                <Save className="mr-2 h-4 w-4" />
                Save & continue
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <ScreenLoader open={isLoading} />
    </div>
  );
}
export default AddressForm;
