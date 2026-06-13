"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import {
  CircleUser,
  CircleUserRound,
  Gitlab,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { SearchInput } from "../ui/search-input";
import { useEffect, useRef, useState } from "react";
import { cn, createSearchParamsUrl } from "@/utils/helper";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InternalServerError } from "@/utils/errors/errors";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useBoundStore } from "@/store/store";
import CShoppingCart from "../icons/CShoppingCart";
import { useGetTotalCartCount } from "@/hooks/query/cart";
import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import BrandLogo from "../icons/brand/BrandLogo";

const searchSchema = z.object({
  search: z.string(),
});

type IFormFields = z.infer<typeof searchSchema>;

const routesForCart = ["search", "products", ""];
const routesForUser = [""];

const navList = [
  { label: "Men", path: "/search?gender=men" },
  { label: "Oversized Tees", path: "/search?category=oversized-tees" },
  { label: "Classic Tees", path: "/search?category=t-shirt" },
  { label: "Fashion Joggers", path: "/search?category=joggers" },
  { label: "Hoodies", path: "/search?category=hoodies" },
];

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const token = useBoundStore((state) => state.token);
  const totalCartItems = useBoundStore((state) => state.totalCartItem);
  const [showSidebar, setShowSidebar] = useState(false);
  const logout = useBoundStore((state) => state.logout);

  useGetTotalCartCount();

  const formattedPathName = pathName.split("/")[1];

  const { register, handleSubmit, setFocus, reset } = useForm<IFormFields>();

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      if (!data.search) {
        toast({
          variant: "destructive",
          title: "Please enter something to search",
        });
        return;
      }
      const newParams = new URLSearchParams(searchParams.toString());
      if (data.search) {
        newParams.set("name", data.search);
      } else {
        newParams.delete("name");
      }
      let searchUrl;

      if (formattedPathName === "search") {
        searchUrl = createSearchParamsUrl(formattedPathName, newParams);
        window.history.replaceState({}, "", searchUrl);
      } else {
        searchUrl = createSearchParamsUrl("/search", newParams);
        router.push(searchUrl);
      }
      setShowSearch(false);
    } catch (error) {
      InternalServerError();
    }
  };

  function toggleSearchInput() {
    setShowSearch((prev) => {
      return !prev;
    });
  }

  function handleOnClear() {
    reset();
  }

  async function handleLogout() {
    logout();
    router.replace("/");
  }

  function handleUserProfileClick() {
    if (token) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  }

  useEffect(() => {
    if (showSearch) {
      setFocus("search");
    }
  }, [showSearch]);

  return (
    <header className="w-full fixed top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-200/60">
      <div className="relative max-w-7xl mx-auto flex-between h-navbar px-4 md:px-6">
        <div className="flex items-center gap-5">
          <Sheet open={showSidebar} onOpenChange={(val) => setShowSidebar(val)}>
            <SheetTrigger className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition-colors lg:hidden">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side={"left"} className="bg-white w-full border-r-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center">
                  <SheetClose className="p-2 rounded-full hover:bg-neutral-100">
                    <X className="h-5 w-5" />
                  </SheetClose>
                  <Link onClick={() => setShowSidebar(false)} href={"/"}>
                    <BrandLogo />
                  </Link>
                  <Link href={"/shopping-bag"}>
                    <CShoppingCart itemCount={totalCartItems} />
                  </Link>
                </div>
                <section className="flex flex-col mt-6">
                  {navList.map((e) => (
                    <Link
                      key={e.label}
                      onClick={() => setShowSidebar(false)}
                      className="home-display text-lg py-3.5 border-b border-neutral-100 text-neutral-800 hover:text-neutral-950 transition-colors"
                      href={e.path}
                    >
                      {e.label}
                    </Link>
                  ))}
                </section>
              <section className="mt-auto space-y-3 pb-2">
                {token ? (
                  <>
                    <Button className="w-full rounded-full" asChild>
                      <Link href={"/profile/details"}>Profile</Link>
                    </Button>
                    <Button
                      className="w-full rounded-full"
                      variant={"outline"}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button className="w-full rounded-full" asChild>
                    <Link href={"/login"}>Log In or Sign Up</Link>
                  </Button>
                )}
              </section>
            </div>
          </SheetContent>
        </Sheet>

          <Link href="/" className="shrink-0">
            <BrandLogo />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navList.map((e) => (
            <Link
              key={e.label}
              href={e.path}
              className="px-3.5 py-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors"
            >
              {e.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {showSearch ? (
            <button
              type="button"
              onClick={toggleSearchInput}
              className="p-2.5 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleSearchInput}
              className="p-2.5 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
          {routesForCart.includes(formattedPathName) && (
            <Link
              href={"/shopping-bag"}
              className="p-2.5 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <CShoppingCart itemCount={totalCartItems} />
            </Link>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "w-full border-t border-neutral-100 bg-white/95 backdrop-blur-md px-4 py-2.5",
          showSearch ? "block" : "hidden"
        )}
      >
        <div className="max-w-2xl mx-auto">
          <SearchInput
            onClear={handleOnClear}
            placeholder={`Try searching "Hoodies"`}
            {...register("search")}
          />
        </div>
      </form>
    </header>
  );
}
