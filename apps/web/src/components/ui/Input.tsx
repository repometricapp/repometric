import type { InputHTMLAttributes } from "react";
import clsx from "@/lib/clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-skyline focus:outline-none",
        className
      )}
      {...props}
    />
  );
}
