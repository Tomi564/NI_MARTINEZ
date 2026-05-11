"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, type ReactNode } from "react";

const ASUNTO_OPTIONS = [
  "Consulta sobre un producto",
  "Estado de mi pedido",
  "Cambio o devolución",
  "Consulta mayorista",
  "Otro",
] as const;

const FAQs: { q: string; a: string }[] = [
  {
    q: "¿Puedo comprar sin tener cuenta en Mercado Libre?",
    a: "Sí, Mercado Libre permite comprar como invitado con tarjeta o transferencia bancaria.",
  },
  {
    q: "¿Cómo sé qué medida de neumático necesito?",
    a: "La medida está impresa en el flanco del neumático actual. Ejemplo: 185/65 R15. También podés consultarnos por WhatsApp con la patente de tu vehículo.",
  },
  {
    q: "¿Hacen instalación?",
    a: "No realizamos instalación. Solo somos venta y distribución online. Podemos recomendarte una gomería cerca de tu domicilio.",
  },
  {
    q: "¿Los precios incluyen IVA?",
    a: "Sí, todos los precios mostrados son finales con IVA incluido.",
  },
  {
    q: "¿Puedo comprar para todo el país?",
    a: "Sí, enviamos a todo Argentina sin costo adicional.",
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<Record<"nombre" | "email" | "mensaje", string>>;

export default function ContactoPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [asunto, setAsunto] = useState<string>(ASUNTO_OPTIONS[0]);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!nombre.trim()) next.nombre = "Completá tu nombre.";
    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      next.email = "Ingresá un email válido.";
    }
    if (!mensaje.trim()) next.mensaje = "Escribí tu mensaje.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-gray-bg">
      <header className="w-full border-b-[3px] border-orange bg-navy">
        <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-10">
          <nav className="mb-2 flex flex-wrap items-center gap-1 text-[11px] text-[var(--color-text-on-dark)]">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span className="opacity-40">→</span>
            <span className="text-white/60">Contacto</span>
          </nav>
          <h1 className="font-condensed text-[28px] font-black uppercase leading-none text-white md:text-[34px]">
            Contacto
          </h1>
          <p className="mt-1.5 text-[13px]" style={{ color: "var(--color-text-on-dark)" }}>
            Respondemos todas las consultas dentro de las 24hs hábiles
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <article className="rounded-lg border-[0.5px] border-gray-border bg-white p-6 border-t-[3px] border-t-orange">
              {!submitted ? (
                <>
                  <h2 className="mb-6 font-condensed text-[18px] font-black uppercase text-navy">
                    Envianos tu consulta
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <Field
                      label="Nombre completo"
                      htmlFor="nombre"
                      error={errors.nombre}
                    >
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className={inputClass(!!errors.nombre)}
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Email" htmlFor="email" error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass(!!errors.email)}
                        autoComplete="email"
                      />
                    </Field>
                    <Field label="Teléfono" htmlFor="telefono">
                      <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        placeholder="Ej: 11 1234-5678"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        className={inputClass(false)}
                        autoComplete="tel"
                      />
                    </Field>
                    <Field label="Asunto" htmlFor="asunto">
                      <select
                        id="asunto"
                        name="asunto"
                        value={asunto}
                        onChange={(e) => setAsunto(e.target.value)}
                        className={inputClass(false)}
                      >
                        {ASUNTO_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Mensaje" htmlFor="mensaje" error={errors.mensaje}>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        rows={4}
                        required
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        className={inputClass(!!errors.mensaje)}
                      />
                    </Field>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded bg-orange py-3 font-sans text-[13px] font-extrabold uppercase tracking-[0.07em] text-white disabled:opacity-70"
                    >
                      {loading ? "Enviando..." : "Enviar"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center py-4 text-center">
                  <SuccessCheck className="mb-4 h-16 w-16 text-green-600" />
                  <p className="font-condensed text-[22px] font-black uppercase text-navy">
                    ¡Mensaje enviado!
                  </p>
                  <p className="mt-2 font-sans text-[13px] font-normal text-text-secondary">
                    Te respondemos dentro de las 24hs hábiles a tu email.
                  </p>
                  <Link
                    href="/"
                    className="mt-6 inline-flex rounded bg-orange px-6 py-3 font-sans text-[13px] font-bold uppercase text-white"
                  >
                    Volver al inicio
                  </Link>
                </div>
              )}
            </article>
          </div>

          <div className="flex flex-col gap-6">
            <article className="rounded-lg border-[0.5px] border-gray-border bg-white p-6 border-t-[3px] border-t-orange">
              <h2 className="mb-4 font-condensed text-[18px] font-black uppercase text-navy">
                Canales de contacto
              </h2>
              <ul className="list-none space-y-4 p-0">
                <li className="flex gap-3 items-start">
                  <WhatsappGlyphSmall className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" />
                  <div>
                    <a
                      href="https://wa.me/5491100000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-[13px] font-bold text-text-primary hover:underline"
                    >
                      +54 9 11 0000-0000
                    </a>
                    <p className="font-sans text-[12px] font-normal text-text-secondary">
                      Lunes a Sábado 9 a 20hs
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <MailIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" />
                  <div>
                    <a
                      href="mailto:info@neumaticosimportados.com.ar"
                      className="font-sans text-[13px] font-bold text-text-primary hover:underline"
                    >
                      info@neumaticosimportados.com.ar
                    </a>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <MelibagIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" />
                  <div>
                    <a
                      href="https://www.mercadolibre.com.ar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-[13px] font-bold text-text-primary hover:underline"
                    >
                      Ver nuestra tienda en Mercado Libre
                    </a>
                  </div>
                </li>
              </ul>
            </article>

            <article className="rounded-lg border-[0.5px] border-gray-border bg-white p-6 border-t-[3px] border-t-orange">
              <h2 className="mb-4 font-condensed text-[18px] font-black uppercase text-navy">
                Preguntas frecuentes
              </h2>
              <ul className="list-none divide-y divide-gray-border p-0">
                {FAQs.map((faq, i) => {
                  const open = openFaq === i;
                  return (
                    <li key={faq.q} className="py-2 first:pt-0">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-2 text-left"
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                      >
                        <span className="font-sans text-[13px] font-bold text-text-primary pr-2">
                          {faq.q}
                        </span>
                        <span
                          className="flex-shrink-0 font-sans text-[18px] font-bold text-orange"
                          aria-hidden
                        >
                          {open ? "−" : "+"}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open ? (
                          <motion.div
                            key={faq.q}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="pb-2 pt-2 font-sans text-[12px] font-normal leading-relaxed text-text-secondary">
                              {faq.a}
                            </p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded border px-3 py-[10px] font-sans text-[13px] font-normal text-text-primary",
    "bg-gray-bg border-gray-border focus:border-orange focus:bg-white focus:outline-none",
    hasError ? "border-red-600" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1 block font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-text-primary"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 font-sans text-[10px] font-normal text-red-600">{error}</p>
      ) : null}
    </div>
  );
}

function SuccessCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path
        d="M20 34L28 42L44 22"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsappGlyphSmall({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function MelibagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  );
}
