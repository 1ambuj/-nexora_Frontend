import { getCategoriesApi } from "@/services/master/categories";
import { getProductList } from "@/services/product/list-product";
import { ICategory, IProductList } from "@/types/api";
import { unstable_cache } from "next/cache";
import {
  BESTSELLER_PRODUCT,
  CATEGORY_LIST,
  LATEST_PRODUCT,
} from "@/constants/reactquery";
import HomeLanding from "./_component/HomeLanding";

const revalidate = 1;

const getCategories = unstable_cache(
  async () => getCategoriesApi(),
  [CATEGORY_LIST],
  { revalidate }
);

const getLatestProduct = unstable_cache(
  async () => {
    const { data } = await getProductList({
      page: 1,
      limit: 4,
      collection: "latest",
    });
    return data;
  },
  [LATEST_PRODUCT],
  { revalidate }
);

const getBestSellerProduct = unstable_cache(
  async () => {
    const { data } = await getProductList({
      page: 1,
      limit: 4,
      collection: "best-sellers",
    });
    return data;
  },
  [BESTSELLER_PRODUCT],
  { revalidate }
);

export default async function Home() {
  let categories: ICategory[] = [];
  let latestProducts: IProductList[] = [];
  let bestsellerProducts: IProductList[] = [];

  try {
    const categoryList = await getCategories();
    categories = categoryList?.data ?? [];
    latestProducts = (await getLatestProduct()) ?? [];
    bestsellerProducts = (await getBestSellerProduct()) ?? [];
  } catch {
    // Static fallback data renders when backend is unavailable
  }

  return (
    <HomeLanding
      categories={categories}
      latestProducts={latestProducts}
      bestsellerProducts={bestsellerProducts}
    />
  );
}
