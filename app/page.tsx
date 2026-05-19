import Hero from "@/components/home/Hero";
import Buscador from "@/components/home/Buscador";
import BannersCarrusel from "@/components/home/BannersCarrusel";
import MedidasRapidas from "@/components/home/MedidasRapidas";
import ProductosDestacados from "@/components/home/ProductosDestacados";
import Categorias from "@/components/home/Categorias";
import Marcas from "@/components/home/Marcas";
import Confianza from "@/components/home/Confianza";
import PasosMontaje from "@/components/home/PasosMontaje";
import FaqHome from "@/components/home/FaqHome";

export default function Home() {
  return (
    <>
      <Hero />
      <Buscador />
      <BannersCarrusel />
      <MedidasRapidas />
      <ProductosDestacados />
      <Categorias />
      <Marcas />
      <Confianza />
      <PasosMontaje />
      <FaqHome />
    </>
  );
}
