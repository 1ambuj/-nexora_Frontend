import { cn } from "@/utils/helper";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  dark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center mx-auto max-w-2xl",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 mb-3",
          align === "center" && "justify-center"
        )}
      >
        <span
          className={cn(
            "h-px w-8",
            dark ? "bg-cyan-400/60" : "bg-neutral-300"
          )}
        />
        <p
          className={cn(
            "text-[11px] uppercase tracking-[0.28em] font-medium",
            dark ? "text-cyan-300/80" : "text-neutral-400"
          )}
        >
          {eyebrow}
        </p>
        {align === "center" && (
          <span
            className={cn(
              "h-px w-8",
              dark ? "bg-cyan-400/60" : "bg-neutral-300"
            )}
          />
        )}
      </div>
      <h2
        className={cn(
          "home-display text-[1.75rem] md:text-4xl font-bold tracking-tight leading-[1.1]",
          dark ? "text-white" : "text-neutral-950"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-sm md:text-[15px] leading-relaxed max-w-xl",
            align === "center" && "mx-auto",
            dark ? "text-white/55" : "text-neutral-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
