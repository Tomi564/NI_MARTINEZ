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
    a: "La medida está impresa en el flanco del neumático actual. Ejemplo: 185/65 R15. También podés encontrarla en el manual del auto o en la etiqueta del pilar de la puerta del conductor.",
  },
  {
    q: "¿Hacen instalación?",
    a: "Sí, hacemos instalación en Salta y Jujuy en las siguientes ubicaciones:\n• Av. Chile 1301, Salta\n• Av. Sarmiento 275, Salta\n• Las Heras 1245, Salta\n• San Antonio 615, Jujuy\nSi estás en otra ciudad, cualquier gomería cercana y de confianza puede hacerlo.",
  },
  {
    q: "¿Los precios incluyen IVA?",
    a: "Sí, todos los precios publicados son finales y con IVA incluido.",
  },
  {
    q: "¿Puedo comprar desde cualquier lugar del país?",
    a: "Sí, realizamos envíos a todo el país.",
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
                <li className="flex gap-3 items-start">
                  <ClockIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" />
                  <div>
                    <p className="font-sans text-[13px] font-bold text-text-primary">
                      Horario de atención
                    </p>
                    <p className="font-sans text-[12px] font-normal leading-[1.6] text-text-secondary">
                      Respondemos consultas de lunes a sábado de 8 a 18hs. Tiempo de respuesta: hasta
                      24hs hábiles.
                    </p>
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

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7v5l3 2" />
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
