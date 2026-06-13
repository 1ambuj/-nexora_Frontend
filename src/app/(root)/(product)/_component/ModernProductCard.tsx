import PriceDisplay from "@/components/display/PriceDisplay";
import { cn } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ModernProductCardProps = {
  imgLink: string;
  name: string;
  price: number;
  discount: number;
  productLink: string;
  className?: string;
};

export default function ModernProductCard({
  imgLink,
  name,
  price,
  discount,
  productLink,
  className,
}: ModernProductCardProps) {
  return (
    <Link href={productLink} className={cn("group block h-full", className)}>
      <article className="h-full rounded-2xl overflow-hidden bg-white border border-neutral-200/60 hover:border-neutral-300/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.15)] transition-all duration-300">
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          <Image
            alt={name}
            src={imgLink}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 72vw, 25vw"
          />
          <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/10 transition-colors duration-300" />
          {discount > 0 && (
            <span className="absolute top-3 left-3 rounded-full bg-neutral-950 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
              -{discount}%
            </span>
          )}
          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-950 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <div className="px-4 py-3.5">
          <p className="text-[13px] font-medium text-neutral-800 line-clamp-2 leading-snug">
            {name}
          </p>
          <PriceDisplay
            price={price}
            discount={discount}
            className="text-sm mt-1 text-neutral-500"
          />
        </div>
      </article>
    </Link>
  );
}
