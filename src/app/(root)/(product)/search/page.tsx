import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getProductList } from "@/services/product/list-product";
import ProductList from "./_ProductList";
import getQueryClient from "@/lib/queryClient";
import { LIST_PRODUCT } from "@/constants/reactquery";
import { LIMIT } from "@/constants/common";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const param = await searchParams;
  const collection = param["collection"] || null;
  const category = param["category"] || null;
  const name = param["name"] || null;

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [LIST_PRODUCT, name, category, collection],
    queryFn: async ({ pageParam }) => {
      const data = await getProductList({
        page: pageParam,
        limit: LIMIT,
        count: true,
        name,
        category,
        collection,
      });
      return data?.data ?? [];
    },
    initialPageParam: 1,
    getNextPageParam: (_: any, pages: any[]) => {
      return pages.length + 1;
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="home-container py-8 md:py-10">
      <HydrationBoundary state={dehydratedState}>
        <ProductList />
      </HydrationBoundary>
    </div>
  );
};

export default SearchPage;
