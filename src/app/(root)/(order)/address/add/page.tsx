"use client";

import AddressForm from "@/features/address/component/AddressForm";
import { IAddressFormFields } from "@/features/address/libs/validation";
import { useAddUserAddress } from "@/hooks/mutation/address";
import { ADDRESS_TYPE } from "@/constants/api";

const defaultValue = {
  address: {
    country: "India",
  },
  type: ADDRESS_TYPE.HOME,
  isPrimary: true,
};

const AddAddressPage = () => {
  const addressMutation = useAddUserAddress();

  function onSubmit(data: IAddressFormFields) {
    addressMutation.mutate(data);
  }

  return (
    <AddressForm
      isLoading={addressMutation.isPending}
      onSubmit={onSubmit}
      defaultValue={defaultValue}
    />
  );
};

export default AddAddressPage;
