"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import BrandLogo from "@/components/layout/BrandLogo";

type FooterLink = { label: string; href: string };

const catalogoLinks: FooterLink[] = [
  { label: "Autos", href: "/catalogo?tipo=auto" },
  { label: "SUV y 4x4", href: "/catalogo?tipo=suv" },
  { label: "Camionetas", href: "/catalogo?tipo=camioneta" },
  { label: "Comerciales", href: "/catalogo?tipo=comercial" },
  { label: "Motos", href: "/catalogo?tipo=moto" },
  { label: "Ofertas", href: "/catalogo?badge=oferta" },
];

const marcasLinks: FooterLink[] = [
  { label: "Pirelli", href: "/marcas/pirelli" },
  { label: "Dunlop", href: "/marcas/dunlop" },
  { label: "Continental", href: "/marcas/continental" },
  { label: "Falken", href: "/marcas/falken" },
  { label: "Corven", href: "/marcas/corven" },
  { label: "Ver todas →", href: "/marcas" },
];

const infoLinks: FooterLink[] = [
  { label: "Cómo comprar", href: "/como-comprar" },
  { label: "Envíos y plazos", href: "/envios" },
  { label: "Cambios y devoluciones", href: "/envios#devoluciones" },
  { label: "Garantía", href: "/envios#garantia" },
  { label: "¿Cómo leer mi medida?", href: "/como-comprar#medida" },
  { label: "Contacto", href: "/contacto" },
];

const legalLinks: FooterLink[] = [
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Datos fiscales (AFIP)", href: "#" },
];

export default function Footer() {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: 4,
          background: "var(--color-orange)",
        }}
      />
      <footer className="w-full bg-navy-dark">
        <div className="mx-auto max-w-[1280px] px-5 pb-6 pt-10 md:px-8">
          <div className="mb-6 grid grid-cols-2 gap-6 border-b border-[var(--color-footer-border)] pb-6 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <BrandLogo variant="footer" className="mb-3" />

              <p
                className="mb-4 max-w-[200px] text-[11px] leading-[1.6]"
                style={{ color: "#7A9AAA" }}
              >
                Venta online de neumáticos importados con envío a todo Argentina.
                Originales, certificados y al mejor precio.
              </p>

              <div className="flex items-center gap-2">
                <SocialIcon href="https://www.instagram.com/neumaticosimportados.sla/" label="Instagram">
                  <InstagramIcon />
                </SocialIcon>
                <SocialIcon href="#" label="Facebook">
                  <FacebookIcon />
                </SocialIcon>
                <SocialIcon href="#" label="TikTok">
                  <TiktokIcon />
                </SocialIcon>
              </div>
            </div>

            <FooterColumn title="Catálogo" links={catalogoLinks} />
            <FooterColumn title="Marcas" links={marcasLinks} />
            <FooterColumn title="Información" links={infoLinks} />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] text-[var(--color-footer-legal)]">
              © 2026 Neumáticos Importados. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {legalLinks.map((link) => (
                <FooterLink key={link.label} href={link.href} label={link.label} />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      variants={{ rest: {}, hover: {} }}
      className="inline-flex"
    >
      <Link
        href={href}
        className="group flex items-center gap-1 text-[10px] text-[var(--color-footer-legal)] transition-colors duration-150 hover:text-[var(--color-orange)]"
      >
        {label}
        <motion.span
          className="text-[11px] text-orange"
          variants={{ rest: { opacity: 0, x: -4 }, hover: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.15 }}
        >
          →
        </motion.span>
      </Link>
    </motion.div>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
        {title}
      </h3>
      {links.map((link) => (
        <motion.div
          key={link.label}
          whileHover="hover"
          initial="rest"
          variants={{ rest: {}, hover: {} }}
          className="mb-[7px]"
        >
          <Link
            href={link.href}
            className="group flex items-center gap-1 text-[11px] transition-colors duration-150 hover:text-[var(--color-orange)]"
            style={{ color: "#8AAABB" }}
          >
            {link.label}
            <motion.span
              className="text-[11px] text-orange"
              variants={{ rest: { opacity: 0, x: -4 }, hover: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.15 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-[4px] bg-[var(--color-footer-border)] text-[var(--color-footer-col-link)]"
      whileHover={{ scale: 1.15, color: "#E84E0F" }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.a>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 8H16V5H14C11.8 5 10 6.8 10 9V11H8V14H10V19H13V14H15.5L16 11H13V9C13 8.4 13.4 8 14 8Z" fill="currentColor" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 6V14.8C14 16.6 12.5 18 10.7 18C8.9 18 7.5 16.6 7.5 14.8C7.5 13.1 8.9 11.7 10.7 11.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6C14.7 7.5 16 8.4 17.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
