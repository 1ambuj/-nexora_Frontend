import React from "react";
import { AuthForm } from "../_auth-form";
import { AUTH_PAGE_TYPE } from "@/utils/enums";

const RegisterPage = () => {
  return (
    <div className="w-full max-w-md rounded-2xl border border-neutral-200/70 bg-white p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]">
      <AuthForm
        type={AUTH_PAGE_TYPE.REGISTER}
        title="Create your account"
        subTitle={
          <>
            Join Nexora and get access to curated drops, faster checkout, and
            order tracking.
          </>
        }
      />
    </div>
  );
};

export default RegisterPage;
