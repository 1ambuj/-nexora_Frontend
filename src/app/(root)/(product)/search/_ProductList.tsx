"use client";

import { getProductList } from "@/services/product/list-product";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../_component/ModernProductCard";
import { usePathname, useSearchParams } from "next/navigation";
import { LIST_PRODUCT } from "@/constants/reactquery";
import { createSearchParamsUrl, generateProductUrl } from "@/utils/helper";
import Loader from "@/components/loader/Loader";
import { LIMIT, showOnDesktopClass } from "@/constants/common";
import { FILTER_TYPE } from "@/components/filter/AllFilter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import { sortList } from "@/features/filter/data";
import ScreenLoader from "@/components/loader/ScreenLoader";

const ProductList = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const name = searchParams.get("name");
  const category = searchParams.get("category");
  const sizes = searchParams.get(FILTER_TYPE.SIZE)
    ? searchParams.get(FILTER_TYPE.SIZE)!.split(",")
    : [];
  const colors = searchParams.get(FILTER_TYPE.COLOR)
    ? searchParams.get(FILTER_TYPE.COLOR)!.split(",")
    : [];
  const collection = searchParams.get("collection");
  const gender = searchParams.get("gender");
  const sort_by = searchParams.get("sort_by");
  const [hasMore, setHasMore] = useState(true);
  const ref = useRef(null);

  const {
    refetch,
    data: productData,
    isLoading,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [
      LIST_PRODUCT,
      name,
      category,
      collection,
      sizes,
      colors,
      gender,
      sort_by,
    ],
    queryFn: async ({ pageParam }) => {
      const data = await getProductList({
        page: pageParam,
        limit: LIMIT,
        count: true,
        name,
        category,
        sizes,
        colors,
        collection,
        gender,
        sort_by,
      });
      console.log(data.data, "<<<<<<<<<<");
      return data?.data ?? [];
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return pages.length + 1;
    },
  });

  useEffect(() => {
    let oberver = null;
    if (ref.current) {
      oberver = new IntersectionObserver(
        async (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 1 }
      );
      oberver.observe(ref?.current);
    }
    return () => {
      if (oberver && ref.current) {
        oberver.disconnect();
      }
    };
  }, [isLoading]);

  function handleSortChange(val: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sort_by", val);
    const searchUrl = createSearchParamsUrl(pathName, newParams);
    window.history.replaceState({}, "", searchUrl);
  }

  useEffect(() => {
    if (productData?.pages && productData.pages.length > 1) {
      if (productData.pages[productData.pages.length - 1].length === 0) {
        setHasMore(false);
      }
    }
  }, [productData]);


  if (isError)
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-700">
        Something went wrong while loading products. Please try again.
      </div>
    );

  const hasProducts = productData?.pages?.some(
    (page) => Array.isArray(page) && page.length > 0
  );

  return (
  <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-neutral-200/70 pb-6">
        <div>
          <p className="home-display text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
            Shop
          </p>
          <h1 className="home-display text-2xl md:text-3xl font-semibold text-neutral-950 mt-1">
            {name ? `Results for “${name}”` : "All Products"}
          </h1>
        </div>
        <Select
          value={sort_by ?? sortList[0].value}
          onValueChange={handleSortChange}
          defaultValue={sortList[0].value}
        >
          <SelectTrigger className="w-full sm:w-[200px] rounded-full border-neutral-200 bg-white hidden md:flex">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              {sortList.map((e, i) => {
                return (
                  <SelectItem
                    key={`sortby-${i}`}
                    className="cursor-pointer"
                    value={e.value}
                  >
                    {e.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {!hasProducts && !isLoading ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 px-6 py-16 text-center">
          <p className="home-display text-lg font-medium text-neutral-900">
            No products found
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            Try another category or check back after products are added.
          </p>
        </div>
      ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
        {productData?.pages.map((productList, i) => (
          <>
            {productList &&
              Array.isArray(productList) &&
              productList.map((ele, index) => (
                <ProductCard
                  discount={ele.discount}
                  imgLink={ele.imgLink}
                  name={ele.name}
                  productLink={generateProductUrl(
                    ele.slug,
                    ele.batchId,
                    ele.code
                  )}
                  price={ele.price}
                  key={`${ele.code}-${index}`}
                />
              ))}
          </>
        ))}
      </div>
      )}

        {hasMore ? (
          <div ref={ref} className="flex flex-col items-center w-full py-10">
            <Loader />
          </div>
        ) : null}
  </>
  );
};

export default ProductList;
