"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BrandLogo from "@/components/layout/BrandLogo";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Marcas", href: "/marcas" },
  { label: "Envíos", href: "/envios" },
];

function linkIsActive(
  pathname: string,
  searchParams: URLSearchParams,
  href: string,
): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/catalogo") {
    return pathname === "/catalogo";
  }

  if (href === "/marcas") {
    return pathname === "/marcas" || pathname.startsWith("/marcas/");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavbarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sp = new URLSearchParams(searchParams.toString());

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <nav className="mx-auto flex h-[58px] max-w-[1280px] items-center justify-between gap-4 border-b-[2.5px] border-orange bg-navy px-5 md:px-8">
        <Link href="/" className="flex h-full items-center">
          <BrandLogo variant="nav" />
        </Link>

        <ul className="ml-auto hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const active = linkIsActive(pathname, sp, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-[11px] font-bold uppercase tracking-[0.09em] transition-colors duration-150 ${
                    active
                      ? "text-white underline decoration-2 underline-offset-[6px]"
                      : "text-[var(--color-text-nav)] hover:text-white"
                  }`}
                  style={
                    active
                      ? { textDecorationColor: "var(--color-orange)" }
                      : undefined
                  }
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setIsMenuOpen(true)}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-white transition-colors hover:text-orange md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" />
            <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
            <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.2 }}
              className="fixed right-0 top-0 z-50 h-full w-[82%] max-w-sm border-l border-white/10 bg-navy md:hidden"
            >
              <div className="flex h-[58px] items-center justify-between border-b border-white/10 px-4">
                <Link
                  href="/"
                  className="flex h-full items-center py-0.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BrandLogo variant="mobile" />
                </Link>
                <button
                  type="button"
                  aria-label="Cerrar menú"
                  className="inline-flex h-9 w-9 items-center justify-center text-white transition-colors hover:text-orange"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" />
                    <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>
              <div className="px-4 py-3">
                {navLinks.map((link) => {
                  const active = linkIsActive(pathname, sp, link.href);
                  return (
                    <Link
                      key={`mobile-${link.href}`}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center border-b border-white/10 py-4 text-[16px] font-bold ${
                        active ? "text-orange" : "text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default function Navbar() {
  return <NavbarInner />;
}
