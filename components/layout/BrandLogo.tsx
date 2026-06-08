import { LOGO_FULL_SRC } from "@/lib/branding";

type BrandLogoVariant = "nav" | "footer" | "mobile";

/**
 * PNG 4500×4500 con logo centrado y mucho margen.
 * offsetX negativo recorta margen izquierdo; scale define tamaño visible.
 */
const VARIANTS: Record<
  BrandLogoVariant,
  {
    width: number;
    height: number;
    scale: number;
    offsetX: number;
    offsetY: number;
    priority?: boolean;
  }
> = {
  nav: { width: 255, height: 44, scale: 4.5, offsetX: -10, offsetY: 1, priority: true },
  footer: { width: 235, height: 40, scale: 4.2, offsetX: -8, offsetY: 0 },
  mobile: { width: 190, height: 36, scale: 4.2, offsetX: -10, offsetY: 1 },
};

type BrandLogoProps = {
  variant: BrandLogoVariant;
  className?: string;
};

export default function BrandLogo({ variant, className = "" }: BrandLogoProps) {
  const { width, height, scale, offsetX, offsetY, priority } = VARIANTS[variant];

  return (
    <span
      className={`relative block shrink-0 overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_FULL_SRC}
        alt="Neumáticos Importados"
        width={width}
        height={height}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="absolute max-w-none"
        style={{
          height,
          width: "auto",
          left: offsetX,
          top: "50%",
          transform: `translateY(calc(-50% + ${offsetY}px)) scale(${scale})`,
          transformOrigin: "left center",
        }}
      />
    </span>
  );
}
