import React from "react";
import { AuthForm } from "../_auth-form";
import { AUTH_PAGE_TYPE } from "@/utils/enums";

const LoginPage = () => {
  return (
    <div className="w-full max-w-md rounded-2xl border border-neutral-200/70 bg-white p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]">
      <AuthForm
        type={AUTH_PAGE_TYPE.LOGIN}
        title="Welcome back"
        subTitle={<>Sign in to continue shopping with Nexora.</>}
      />
    </div>
  );
};

export default LoginPage;
