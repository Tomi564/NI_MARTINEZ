import type { Metadata } from "next";
import { Saira, Saira_Condensed } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PromoBand from "@/components/layout/PromoBand";
import ScrollProgress from "@/components/shared/ScrollProgress";
import PromoPopup from "@/components/shared/PromoPopup";
import PromoToast from "@/components/shared/PromoToast";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { getMetadataBase } from "@/lib/site";

const saira = Saira({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-saira",
});

const sairaCondensed = Saira_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-saira-condensed",
});

const metadataBase = getMetadataBase();

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title: "Neumáticos Importados | Compra Online — Envío a Todo Argentina",
  description:
    "Comprá neumáticos importados online con envío a todo Argentina. Pirelli, Dunlop, Continental, Falken, Corven y más. Hasta 12 cuotas sin interés vía Mercado Pago.",
  keywords:
    "neumáticos importados, cubiertas online, neumáticos Argentina, Pirelli, Dunlop, Continental, Falken",
  openGraph: {
    title: "Neumáticos Importados | Compra Online — Envío a Todo Argentina",
    description:
      "Comprá neumáticos importados online con envío a todo Argentina. Pirelli, Dunlop, Continental, Falken, Corven y más. Hasta 12 cuotas sin interés vía Mercado Pago.",
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

function NavbarFallback() {
  return (
    <nav className="h-[58px] w-full px-6 flex items-center justify-between gap-4 border-b-[2.5px] border-orange bg-navy" />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${saira.variable} ${sairaCondensed.variable}`}
    >
      <body className="font-sans bg-gray-bg text-text-primary">
        <ScrollProgress />
        <header className="sticky top-0 z-50 bg-navy">
          <PromoBand />
          <Suspense fallback={<NavbarFallback />}>
            <Navbar />
          </Suspense>
        </header>
        <main className="w-full">{children}</main>
        <WhatsAppButton />
        <PromoPopup />
        <PromoToast />
        <Footer />
      </body>
    </html>
  );
}
