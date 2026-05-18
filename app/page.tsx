import Hero from "@/components/home/Hero";
import Buscador from "@/components/home/Buscador";
import BannersCarrusel from "@/components/home/BannersCarrusel";
import MedidasRapidas from "@/components/home/MedidasRapidas";
import Banners from "@/components/home/Banners";
import ProductosDestacados from "@/components/home/ProductosDestacados";
import Categorias from "@/components/home/Categorias";
import Marcas from "@/components/home/Marcas";
import Confianza from "@/components/home/Confianza";

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
      <Banners />
      <Confianza />
    </>
  );
}
