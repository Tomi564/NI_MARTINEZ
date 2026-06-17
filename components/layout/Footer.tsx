"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, type ReactNode } from "react";
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
  { label: "Ver todas", href: "/marcas" },
];

const infoLinks: FooterLink[] = [
  { label: "Cómo comprar", href: "/como-comprar" },
  { label: "Envíos y plazos", href: "/envios" },
  { label: "Cambios y devoluciones", href: "/envios#devoluciones" },
  { label: "Garantía", href: "/envios#garantia" },
  { label: "¿Cómo leer mi medida?", href: "/como-comprar#medida" },
  { label: "Contacto", href: "/contacto" },
];

const infoLinksDesktop: FooterLink[] = infoLinks.filter((l) => l.label !== "Contacto");

const contactoLinks: FooterLink[] = [
  { label: "Contacto", href: "/contacto" },
  { label: "Envíos y plazos", href: "/envios" },
];

const legalLinks: FooterLink[] = [
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Datos fiscales (AFIP)", href: "#" },
];

const accordionSections = [
  { title: "Catálogo", links: catalogoLinks },
  { title: "Marcas", links: marcasLinks },
  { title: "Información", links: infoLinks },
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
        <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-10 md:px-8 md:pb-6">
          {/* Mobile — estilo Dunlop: logo + acordeón + redes + legal */}
          <div className="md:hidden">
            <BrandLogo variant="footer" className="mb-8" />

            <FooterAccordion sections={accordionSections} />

            <div className="mt-8 flex items-center gap-5">
              <SocialIcon
                href="https://www.instagram.com/neumaticosimportados.sla/"
                label="Instagram"
                plain
              >
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon href="#" label="Facebook" plain>
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon href="#" label="TikTok" plain>
                <TiktokIcon />
              </SocialIcon>
            </div>

            <nav className="mt-8 flex flex-col gap-3" aria-label="Enlaces legales">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white transition-colors hover:text-[var(--color-orange)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <p className="mt-6 text-xs leading-relaxed text-white/50">
              © 2026 Neumáticos Importados. Todos los derechos reservados.
            </p>
          </div>

          {/* Desktop — estilo Dunlop: logo + columnas + legal centrado */}
          <div className="hidden md:block">
            <BrandLogo variant="footer" className="mb-10" />

            <div className="grid grid-cols-4 gap-8 lg:gap-10">
              <FooterColumnDunlop title="Catálogo" links={catalogoLinks} />
              <FooterColumnDunlop title="Marcas" links={marcasLinks} />
              <FooterColumnDunlop title="Información" links={infoLinksDesktop} />
              <div>
                <FooterColumnDunlop title="Contacto" links={contactoLinks} />
                <div className="mt-8">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-orange)]">
                    Redes sociales
                  </h3>
                  <div className="mb-4 mt-3 border-b border-white/30" />
                  <div className="flex items-center gap-5">
                    <SocialIcon
                      href="https://www.instagram.com/neumaticosimportados.sla/"
                      label="Instagram"
                      plain
                    >
                      <InstagramIcon />
                    </SocialIcon>
                    <SocialIcon href="#" label="Facebook" plain>
                      <FacebookIcon />
                    </SocialIcon>
                    <SocialIcon href="#" label="TikTok" plain>
                      <TiktokIcon />
                    </SocialIcon>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <nav
                className="mb-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-white/70"
                aria-label="Enlaces legales"
              >
                {legalLinks.map((link, index) => (
                  <span key={link.label} className="inline-flex items-center gap-2">
                    {index > 0 && <span className="text-white/30" aria-hidden>|</span>}
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-[var(--color-orange)]"
                    >
                      {link.label}
                    </Link>
                  </span>
                ))}
              </nav>
              <p className="text-xs text-white/70">
                © 2026 Neumáticos Importados. Todos los derechos reservados.
              </p>
              <p className="mt-2 text-xs text-white/50">
                Venta online de neumáticos importados con envío a todo Argentina.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterAccordion({
  sections,
}: {
  sections: { title: string; links: FooterLink[] }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-white/20">
      {sections.map((section, index) => {
        const open = openIndex === index;

        return (
          <div key={section.title} className="border-b border-white/20">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="text-[15px] font-bold uppercase italic tracking-[0.04em] text-[var(--color-orange)]">
                {section.title}
              </span>
              <span className="text-2xl font-light leading-none text-white" aria-hidden>
                {open ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="m-0 list-none space-y-3 pb-5 pl-0">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-white transition-colors hover:text-[var(--color-orange)]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function FooterColumnDunlop({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-orange)]">
        {title}
      </h3>
      <div className="mb-4 mt-3 border-b border-white/30" />
      <ul className="m-0 list-none space-y-2.5 p-0">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white transition-colors hover:text-[var(--color-orange)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
  plain = false,
}: {
  href: string;
  label: string;
  children: ReactNode;
  plain?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={
        plain
          ? "inline-flex text-white transition-colors hover:text-[var(--color-orange)]"
          : "inline-flex h-8 w-8 items-center justify-center rounded-[4px] bg-[var(--color-footer-border)] text-[var(--color-footer-col-link)]"
      }
      whileHover={plain ? undefined : { scale: 1.15, color: "#E84E0F" }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.a>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 8H16V5H14C11.8 5 10 6.8 10 9V11H8V14H10V19H13V14H15.5L16 11H13V9C13 8.4 13.4 8 14 8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 6V14.8C14 16.6 12.5 18 10.7 18C8.9 18 7.5 16.6 7.5 14.8C7.5 13.1 8.9 11.7 10.7 11.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 6C14.7 7.5 16 8.4 17.5 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
