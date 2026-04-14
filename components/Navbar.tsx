"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/home", label: "Home" },
  { href: "/destination", label: "Destination" },
  { href: "/guide", label: "Guide" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-ink/[0.06]">
      <div className="mx-auto max-w-page px-6 sm:px-8 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-ink hover:text-accent transition-colors duration-300"
        >
          Ben Inglee
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative text-[0.8125rem] font-sans uppercase tracking-label transition-colors duration-300 ${
                    active
                      ? "text-ink"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-1.5 -mr-1.5 text-ink/70 hover:text-ink transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 7h16M4 12h12M4 17h16"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-ink/[0.06] bg-cream/95 backdrop-blur-md">
          <ul className="flex flex-col px-6 sm:px-8 py-4 gap-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-[0.8125rem] font-sans uppercase tracking-label transition-colors duration-300 ${
                    pathname === href
                      ? "text-ink"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
