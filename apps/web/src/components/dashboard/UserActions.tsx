"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type UserActionsProps = {
  name: string;
};

export default function UserActions({ name }: UserActionsProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !buttonRef.current) {
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const menuWidth = 224;
    const menuHeight = 248;
    const margin = 12;

    let left = rect.right - menuWidth;
    left = Math.max(margin, Math.min(left, window.innerWidth - menuWidth - margin));

    const openUp = rect.bottom + menuHeight + margin > window.innerHeight;
    const top = openUp ? rect.top - menuHeight - margin : rect.bottom + margin;

    setMenuStyle({
      position: "fixed",
      top,
      left,
      width: menuWidth,
      zIndex: 60
    });
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        ref={buttonRef}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm font-semibold text-white shadow-glow"
        aria-label="Open profile menu"
        aria-expanded={isOpen}
      >
        {initials}
      </button>
      {isOpen ? (
        <div
          style={menuStyle}
          className="rounded-2xl border border-white/10 bg-[#0b0f19]/95 p-2 text-sm text-white shadow-glow backdrop-blur"
        >
          <div className="px-3 py-2">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              Signed in
            </p>
            <p className="mt-1 font-semibold">{name}</p>
          </div>
          <div className="my-2 h-px bg-white/10"></div>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-white/80 hover:bg-white/10"
          >
            Profile settings
            <span className="text-xs text-white/40">Soon</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-white/80 hover:bg-white/10"
          >
            Organization access
            <span className="text-xs text-white/40">Manage</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-white/80 hover:bg-white/10"
          >
            Theme preferences
            <span className="text-xs text-white/40">Auto</span>
          </button>
          <div className="my-2 h-px bg-white/10"></div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-semibold text-rose-200 hover:bg-rose-500/10"
          >
            Log out
            <span className="text-xs text-rose-200/60">Secure</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
