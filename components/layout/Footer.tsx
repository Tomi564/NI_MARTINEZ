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
  { label: "Pirelli", href: "/catalogo?marca=pirelli" },
  { label: "Dunlop", href: "/catalogo?marca=dunlop" },
  { label: "Bridgestone", href: "/catalogo?marca=bridgestone" },
  { label: "Goodyear", href: "/catalogo?marca=goodyear" },
  { label: "Corven", href: "/catalogo?marca=corven" },
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
    <footer className="w-full bg-navy-dark">
      <div className="mx-auto max-w-[1280px] px-5 pb-6 pt-10 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-[var(--color-footer-border)]">
          <div className="col-span-2 md:col-span-1">
            <BrandLogo variant="footer" className="mb-3" />

            <p className="mb-4 max-w-[200px] text-[11px] leading-[1.6] text-[var(--color-footer-desc)]">
              Venta online de neumáticos importados con envío a todo Argentina.
              Originales, certificados y al mejor precio.
            </p>

            <div className="flex items-center gap-2">
              <SocialIcon href="#" label="Instagram">
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon href="#" label="Facebook">
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon href="#" label="WhatsApp">
                <WhatsappIcon />
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

        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-[10px] text-[var(--color-footer-legal)]">
            © 2026 Neumáticos Importados. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[10px] text-[var(--color-footer-legal)] transition-colors duration-150 hover:text-orange"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="mb-3 text-[10px] text-white font-bold uppercase tracking-[0.12em]">
        {title}
      </h3>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="mb-[7px] block text-[11px] text-[var(--color-footer-col-link)] transition-colors duration-150 hover:text-orange"
        >
          {link.label}
        </Link>
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
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-[4px] bg-[var(--color-footer-border)] text-[var(--color-footer-col-link)] transition-colors duration-150 hover:bg-[var(--color-footer-hover-bg)] hover:text-orange"
    >
      {children}
    </a>
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

function WhatsappIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19.5 11.5C19.5 15.6 16.1 19 12 19C10.8 19 9.7 18.7 8.6 18.2L5 19L5.8 15.4C5.3 14.3 5 13.2 5 12C5 7.9 8.4 4.5 12.5 4.5C16.6 4.5 19.5 7.4 19.5 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9.5 10C9.9 11.2 10.8 12.1 12 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
