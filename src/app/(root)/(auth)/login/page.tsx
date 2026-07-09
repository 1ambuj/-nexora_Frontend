import React from "react";
import { AuthForm } from "../_auth-form";
import { AUTH_PAGE_TYPE } from "@/utils/enums";

const LoginPage = () => {
  return (
    <div className="w-full max-w-md rounded-3xl border border-neutral-200/80 bg-white/95 p-8 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.18)] backdrop-blur-sm">
      <AuthForm
        type={AUTH_PAGE_TYPE.LOGIN}
        title="Welcome back"
        subTitle={<>Sign in to continue shopping with Nexora.</>}
      />
    </div>
  );
};

export default LoginPage;
