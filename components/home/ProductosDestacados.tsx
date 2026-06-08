"use client";

import ProductCard from "@/components/catalogo/ProductCard";
import FadeInView from "@/components/shared/FadeInView";
import SectionTitle from "@/components/shared/SectionTitle";
import { productosMock } from "@/lib/mockProductos";

export default function ProductosDestacados() {
  return (
    <section className="w-full bg-[var(--color-gray-bg)]">
      <div className="mx-auto max-w-[1280px] px-6 pt-5 pb-12 md:px-8 md:pt-6 md:pb-14">
        <SectionTitle
          title="Productos "
          highlight="destacados"
          linkText="Ver catálogo completo"
          linkHref="/catalogo"
        />

        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {productosMock.map((producto, index) => (
            <FadeInView key={producto.id} delay={index * 0.08} className={`flex ${index >= 4 ? "hidden lg:flex" : ""}`}>
              <ProductCard producto={producto} className="w-full" />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
