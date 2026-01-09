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
        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-slate-200 text-xs font-bold text-slate-700 dark:border-border-dark dark:bg-card-dark dark:text-slate-100"
        aria-label="Open profile menu"
        aria-expanded={isOpen}
      >
        {initials}
      </button>
      {isOpen ? (
        <div
          style={menuStyle}
          className="rounded-lg border border-slate-200 bg-white p-2 text-sm text-slate-900 shadow-lg dark:border-border-dark dark:bg-card-dark dark:text-slate-100"
        >
          <div className="px-3 py-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-text-muted">
              Signed in
            </p>
            <p className="mt-1 font-semibold">{name}</p>
          </div>
          <div className="my-2 h-px bg-slate-200 dark:bg-border-dark"></div>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded px-3 py-2 text-left text-slate-600 hover:bg-slate-100 dark:text-text-muted dark:hover:bg-white/5"
          >
            Profile settings
            <span className="text-[10px] text-slate-400 dark:text-text-muted">Soon</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded px-3 py-2 text-left text-slate-600 hover:bg-slate-100 dark:text-text-muted dark:hover:bg-white/5"
          >
            Organization access
            <span className="text-[10px] text-slate-400 dark:text-text-muted">Manage</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded px-3 py-2 text-left text-slate-600 hover:bg-slate-100 dark:text-text-muted dark:hover:bg-white/5"
          >
            Theme preferences
            <span className="text-[10px] text-slate-400 dark:text-text-muted">Auto</span>
          </button>
          <div className="my-2 h-px bg-slate-200 dark:bg-border-dark"></div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-between rounded px-3 py-2 text-left font-semibold text-red-500 hover:bg-red-500/10"
          >
            Log out
            <span className="text-[10px] text-red-400/80">Secure</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
