import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { LockKeyhole, UserPlus } from "lucide-react";
import Link from "next/link";
import { setPostLoginRedirect } from "@/utils/checkout";

function LoginDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  const router = useRouter();

  function handleLogin() {
    onOpenChange(false);
    setPostLoginRedirect("/address");
    router.push("/login");
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-2xl border-neutral-200 p-0 overflow-hidden">
        <div className="bg-neutral-950 px-6 py-8 text-center text-white">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <AlertDialogHeader className="space-y-2 text-center">
            <AlertDialogTitle className="text-xl font-semibold text-white">
              Sign in to checkout
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-neutral-300 leading-relaxed">
              Your bag is ready. Log in to save your address, track orders, and
              complete payment securely.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <div className="space-y-3 px-6 py-5">
          <AlertDialogAction
            onClick={handleLogin}
            className="w-full rounded-full h-11 bg-neutral-950 hover:bg-neutral-800"
          >
            Continue to Sign In
          </AlertDialogAction>
          <AlertDialogCancel className="w-full rounded-full h-11 border-neutral-200">
            Keep browsing
          </AlertDialogCancel>
          <p className="text-center text-xs text-neutral-500">
            New to Nexora?{" "}
            <Link
              href="/register"
              onClick={() => onOpenChange(false)}
              className="inline-flex items-center gap-1 font-medium text-neutral-900 hover:underline"
            >
              <UserPlus className="h-3 w-3" />
              Create an account
            </Link>
          </p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoginDialog;
