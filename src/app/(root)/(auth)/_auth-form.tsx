"use client";

import { cn } from "@/utils/helper";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/formFields/input";
import GoogleIcon from "@/components/icons/brand/GoogleIcon";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailSchema,
  passwordSchema,
} from "@/lib/validation/commonSchema";
import { loginApi, registerApi } from "@/services/auth/user-account";
import { useToast } from "@/hooks/use-toast";
import { ERROR_STATUS, InternalServerError } from "@/utils/errors/errors";
import { IApiError } from "@/types/errors";
import FacebookIcon from "@/components/icons/brand/FacebookIcon";
import Divider from "@/components/ui/divider";
import Link from "next/link";
import { AUTH_PAGE_TYPE } from "@/utils/enums";
import { useRouter } from "next/navigation";
import { useBoundStore } from "@/store/store";
import { useState } from "react";
import ScreenLoader from "@/components/loader/ScreenLoader";
import { BACKEND_URL } from "@/constants/common";
import { ShoppingBag, Sparkles } from "lucide-react";

const loginSchema = z.object({
  userId: emailSchema,
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z
  .object({
    userId: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type IFormFields = z.infer<typeof loginSchema> | z.infer<typeof registerSchema>;

interface IAuthForm extends React.ComponentPropsWithoutRef<"div"> {
  type: AUTH_PAGE_TYPE;
  title: string;
  subTitle: React.ReactNode;
}

function getAuthErrorMessage(error: IApiError): string {
  if (error?.message) return error.message;

  if (error?.status === ERROR_STATUS.INVALID_CRED) {
    return "Invalid email or password";
  }
  if (error?.status === ERROR_STATUS.ALREADY_EXIST) {
    return "An account with this email already exists";
  }
  if (error?.status === ERROR_STATUS.VALIDATION_ERROR) {
    return "Please check your details and try again";
  }

  return "Something went wrong. Please try again.";
}

export function AuthForm({
  className,
  type,
  title,
  subTitle,
  ...props
}: IAuthForm) {
  const router = useRouter();
  const setLoggedIn = useBoundStore((state) => state.setLoggedIn);
  const { toast } = useToast();
  const [showScreenLoader, setScreenLoader] = useState(false);

  const isLogin = type === AUTH_PAGE_TYPE.LOGIN;
  const formSchema = isLogin ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormFields>({
    resolver: zodResolver(formSchema),
  });

  const fullErrors: FieldErrors<z.infer<typeof registerSchema>> = errors;

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      setScreenLoader(true);

      if (isLogin) {
        const res = await loginApi(data);
        setLoggedIn({ token: res.data.accessToken });
        toast({
          title: "Welcome back!",
          description: "You are now signed in.",
        });
        router.push("/");
        return;
      }

      await registerApi({
        userId: data.userId,
        password: data.password,
      });

      toast({
        title: "Account created",
        description: "Signing you in now…",
      });

      const loginRes = await loginApi({
        userId: data.userId,
        password: data.password,
      });
      setLoggedIn({ token: loginRes.data.accessToken });
      router.push("/");
    } catch (error) {
      const typeError = error as IApiError;
      toast({
        title: getAuthErrorMessage(typeError),
        variant: "destructive",
      });
    } finally {
      setScreenLoader(false);
    }
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-950 text-white shadow-lg">
            {isLogin ? (
              <ShoppingBag className="h-5 w-5" />
            ) : (
              <Sparkles className="h-5 w-5" />
            )}
          </div>
          <p className="home-display text-2xl font-semibold tracking-tight text-neutral-950">
            {title}
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed">{subTitle}</p>
        </div>

        <div className="grid gap-2">
          <Link href={`${BACKEND_URL}/user/sso/google`}>
            <Button
              disabled={isSubmitting}
              variant="outline"
              className="w-full rounded-full h-11 border-neutral-200 bg-white hover:bg-neutral-50"
            >
              <GoogleIcon />
              {isLogin ? "Sign in with Google" : "Sign up with Google"}
            </Button>
          </Link>
          <Button
            disabled
            variant="outline"
            className="w-full rounded-full h-11 border-neutral-200 opacity-60"
          >
            <FacebookIcon />
            Facebook — coming soon
          </Button>
        </div>

        <Divider text="OR" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          <div className="flex flex-col gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs text-neutral-500">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("userId")}
                errMsg={errors.userId?.message}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs text-neutral-500">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                {...register("password")}
                errMsg={errors.password?.message}
              />
              {isLogin && (
                <a
                  href="#"
                  className="mt-1 ml-auto block text-xs text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline"
                >
                  Forgot your password?
                </a>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-1.5">
                <Label
                  htmlFor="confirmPassword"
                  className="text-xs text-neutral-500"
                >
                  Confirm password
                </Label>
                <Input
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  type="password"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                  errMsg={fullErrors.confirmPassword?.message}
                />
              </div>
            )}

            <Button
              disabled={isSubmitting}
              type="submit"
              className="mt-2 w-full rounded-full h-11 bg-neutral-950 hover:bg-neutral-800 shadow-sm"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </div>

          <div className="mt-5 text-center text-sm text-neutral-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Link
              href={isLogin ? "/register" : "/login"}
              className="ml-2 font-medium text-neutral-900 underline-offset-4 hover:underline"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </form>
        <ScreenLoader open={showScreenLoader} />
      </div>
    </>
  );
}
