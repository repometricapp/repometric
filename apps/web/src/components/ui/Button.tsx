import type { ButtonHTMLAttributes } from "react";
import clsx from "@/lib/clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
        variant === "primary"
          ? "bg-accent text-ink shadow-glow hover:bg-orange-400"
          : "border border-white/15 bg-white/5 text-white hover:bg-white/10",
        className
      )}
      {...props}
    />
  );
}
