import {

  Carousel,

  CarouselContent,

  CarouselItem,

} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";

import { ICategory, IProductList } from "@/types/api";

import { generateProductUrl } from "@/utils/helper";

import Image from "next/image";

import Link from "next/link";

import { ArrowRight, ArrowUpRight } from "lucide-react";

import HeroSection from "./HeroSection";

import ModernProductCard from "./ModernProductCard";

import SectionHeader from "./SectionHeader";

import Footer from "./Footer";

import {

  brandStats,

  collectionBento,

  ctaBannerImage,

  fallbackCategories,

  fallbackProducts,

  featuredEditorial,

  marqueeItems,

  quickShopLinks,

  trustFeatures,

} from "./home-data";



type HomeLandingProps = {

  categories: ICategory[];

  latestProducts: IProductList[];

  bestsellerProducts: IProductList[];

};



function SectionAction({ href, label }: { href: string; label: string }) {

  return (

    <Button

      asChild

      variant="outline"

      className="hidden md:inline-flex rounded-full h-9 px-4 text-xs border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:border-neutral-300 shrink-0"

    >

      <Link href={href}>

        {label}

        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />

      </Link>

    </Button>

  );

}



function ProductGrid({

  products,

}: {

  products: (IProductList | (typeof fallbackProducts)[0])[];

}) {

  return (

    <>

      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">

        {products.map((product) => (

          <ModernProductCard

            key={product.code}

            discount={product.discount}

            imgLink={product.imgLink}

            name={product.name}

            price={product.price}

            productLink={generateProductUrl(

              product.slug,

              product.batchId,

              product.code

            )}

          />

        ))}

      </div>

      <div className="md:hidden -mx-1">

        <Carousel className="relative">

          <CarouselContent className="-ml-3">

            {products.map((product) => (

              <CarouselItem

                key={product.code}

                className="pl-3 basis-[78%] xs:basis-[62%]"

              >

                <ModernProductCard

                  discount={product.discount}

                  imgLink={product.imgLink}

                  name={product.name}

                  price={product.price}

                  productLink={generateProductUrl(

                    product.slug,

                    product.batchId,

                    product.code

                  )}

                />

              </CarouselItem>

            ))}

          </CarouselContent>

        </Carousel>

      </div>

    </>

  );

}



export default function HomeLanding({

  categories,

  latestProducts,

  bestsellerProducts,

}: HomeLandingProps) {

  const displayCategories =

    categories.length > 0 ? categories : fallbackCategories;

  const displayLatest =

    latestProducts.length > 0 ? latestProducts : fallbackProducts;

  const displayBestsellers =

    bestsellerProducts.length > 0

      ? bestsellerProducts

      : [...fallbackProducts].reverse();



  return (

    <div className="bg-white text-neutral-900 overflow-x-hidden">

      <HeroSection />



      {/* Trust strip */}

      <section className="border-b border-neutral-200/70 bg-white">

        <div className="home-container py-5 md:py-6">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

            {trustFeatures.map((item) => (

              <div key={item.label} className="flex flex-col gap-0.5">

                <p className="text-xs font-semibold text-neutral-900 tracking-wide">

                  {item.label}

                </p>

                <p className="text-[11px] text-neutral-400">{item.desc}</p>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* Marquee */}

      <div className="bg-neutral-950 py-3 overflow-hidden">

        <div className="flex home-marquee whitespace-nowrap">

          {[...marqueeItems, ...marqueeItems].map((item, i) => (

            <span

              key={i}

              className="mx-8 text-[10px] uppercase tracking-[0.24em] text-white/40 font-medium"

            >

              {item}

            </span>

          ))}

        </div>

      </div>



      {/* Collections */}

      <section className="home-section bg-neutral-50/80">

        <div className="home-container">

          <SectionHeader

            eyebrow="Collections"

            title="Curated by Nexora"

            subtitle="Modular wardrobe systems built around movement, climate, and city life."

            className="mb-8"

          />



          <div className="flex flex-wrap gap-2 mb-8">

            {quickShopLinks.map((link) => (

              <Link

                key={link.href}

                href={link.href}

                className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-950 hover:border-neutral-300 transition-colors"

              >

                {link.label}

              </Link>

            ))}

          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 md:auto-rows-[210px]">

            {collectionBento.map((item) => (

              <Link

                key={item.title}

                href={item.redirect}

                className={`group relative rounded-2xl overflow-hidden min-h-[240px] md:min-h-0 ring-1 ring-neutral-900/5 ${item.span}`}

              >

                <Image

                  src={item.image}

                  alt={item.title}

                  fill

                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"

                  sizes="(max-width: 768px) 100vw, 33vw"

                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/15 to-transparent" />

                <span className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                  <ArrowUpRight className="h-4 w-4" />

                </span>

                <div className="absolute bottom-0 left-0 p-5 md:p-6">

                  <p className="home-display text-xl md:text-2xl font-bold text-white">

                    {item.title}

                  </p>

                  <p className="text-xs text-white/60 mt-1">{item.subtitle}</p>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>



      {/* Editorial */}

      <section className="home-section">

        <div className="home-container">

          <div className="grid md:grid-cols-2 rounded-[1.75rem] overflow-hidden bg-white ring-1 ring-neutral-200/80 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.15)]">

            <div className="relative min-h-[280px] md:min-h-[440px]">

              <Image

                src={featuredEditorial.image}

                alt={featuredEditorial.title}

                fill

                className="object-cover"

                sizes="(max-width: 768px) 100vw, 50vw"

              />

            </div>

            <div className="flex flex-col justify-center p-8 md:p-11 lg:p-14 bg-white">

              <span className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 mb-4 font-medium">

                {featuredEditorial.tag}

              </span>

              <h2 className="home-display text-2xl md:text-[2.35rem] font-bold leading-[1.12] text-neutral-950">

                {featuredEditorial.title}

              </h2>

              <p className="mt-4 text-neutral-500 leading-relaxed text-sm md:text-[15px]">

                {featuredEditorial.body}

              </p>

              <Button

                asChild

                className="mt-8 w-fit rounded-full bg-neutral-950 text-white hover:bg-neutral-800 px-7 h-11 text-sm"

              >

                <Link href={featuredEditorial.redirect}>

                  {featuredEditorial.cta}

                  <ArrowRight className="ml-2 h-4 w-4" />

                </Link>

              </Button>

            </div>

          </div>

        </div>

      </section>



      {/* Categories */}

      <section className="home-section bg-neutral-50/80">

        <div className="home-container">

          <SectionHeader

            eyebrow="Shop by category"

            title="Define your uniform"

            subtitle="Four core systems. Infinite combinations."

            align="center"

            className="mb-10"

          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">

            {displayCategories.map((cat) => (

              <Link

                key={cat.slug}

                href={`/search?category=${cat.slug}`}

                className="group rounded-2xl overflow-hidden bg-white ring-1 ring-neutral-200/70 hover:ring-neutral-300 transition-all duration-300 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.12)]"

              >

                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">

                  <Image

                    src={cat.icon}

                    alt={cat.name}

                    fill

                    className="object-cover transition-transform duration-500 group-hover:scale-105"

                    sizes="(max-width: 768px) 50vw, 25vw"

                  />

                  <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/5 transition-colors" />

                </div>

                <div className="flex items-center justify-between px-4 py-3.5">

                  <p className="home-display text-sm font-semibold text-neutral-800">

                    {cat.name}

                  </p>

                  <ArrowUpRight className="h-3.5 w-3.5 text-neutral-300 group-hover:text-neutral-600 transition-colors" />

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>



      {/* Latest */}

      <section className="home-section">

        <div className="home-container">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-9">

            <SectionHeader

              eyebrow="Just dropped"

              title="Latest arrivals"

              subtitle="Fresh silhouettes, limited runs."

            />

            <SectionAction href="/search?collection=latest" label="View all" />

          </div>

          <ProductGrid products={displayLatest} />

          <div className="mt-7 md:hidden">

            <Button

              asChild

              variant="outline"

              className="rounded-full w-full h-11 border-neutral-200"

            >

              <Link href="/search?collection=latest">View all arrivals</Link>

            </Button>

          </div>

        </div>

      </section>



      {/* Stats */}

      <section className="home-section bg-neutral-950 text-white">

        <div className="home-container">

          <SectionHeader

            eyebrow="Nexora"

            title="Engineered for what's next"

            subtitle="Performance apparel with a design-first mindset."

            align="center"

            dark

            className="mb-11"

          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

            {brandStats.map((stat) => (

              <div

                key={stat.label}

                className="text-center rounded-2xl border border-white/8 bg-white/[0.04] p-6 md:p-8"

              >

                <p className="home-display text-3xl md:text-[2.5rem] font-bold text-white leading-none">

                  {stat.value}

                </p>

                <p className="mt-2.5 text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/40">

                  {stat.label}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* Bestsellers */}

      <section className="home-section bg-neutral-50/80">

        <div className="home-container">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-9">

            <SectionHeader

              eyebrow="Community favorites"

              title="Bestsellers"

              subtitle="The pieces people keep coming back for."

            />

            <SectionAction

              href="/search?collection=best-sellers"

              label="View all"

            />

          </div>

          <ProductGrid products={displayBestsellers} />

          <div className="mt-7 md:hidden">

            <Button

              asChild

              variant="outline"

              className="rounded-full w-full h-11 border-neutral-200"

            >

              <Link href="/search?collection=best-sellers">

                View all bestsellers

              </Link>

            </Button>

          </div>

        </div>

      </section>



      {/* CTA */}

      <section className="home-section !pb-24">

        <div className="home-container">

          <div className="relative rounded-[1.75rem] overflow-hidden min-h-[280px] md:min-h-[360px] flex items-center justify-center text-center ring-1 ring-neutral-900/10">

            <Image

              src={ctaBannerImage}

              alt="Join Nexora"

              fill

              className="object-cover"

              sizes="100vw"

            />

            <div className="absolute inset-0 bg-neutral-950/50" />

            <div className="relative z-10 px-6 py-14 max-w-md mx-auto">

              <p className="text-[10px] uppercase tracking-[0.28em] text-white/50 mb-4">

                Members get early access

              </p>

              <h2 className="home-display text-2xl md:text-[2.35rem] font-bold text-white leading-[1.12]">

                Step into the next era of streetwear

              </h2>

              <Button

                asChild

                className="mt-8 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 px-9 h-11 text-sm font-semibold"

              >

                <Link href="/login">Join Nexora</Link>

              </Button>

            </div>

          </div>

        </div>

      </section>



      <Footer />

    </div>

  );

}


