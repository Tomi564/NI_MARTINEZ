"use client";

import Link from "next/link";
import FadeInView from "@/components/shared/FadeInView";

export type SectionTitleProps = {
  title: string;
  highlight: string;
  highlightPosition?: "start" | "end";
  light?: boolean;
  linkText?: string;
  linkHref?: string;
};

export default function SectionTitle({
  title,
  highlight,
  highlightPosition = "end",
  light = false,
  linkText,
  linkHref,
}: SectionTitleProps) {
  const showLink = Boolean(linkText && linkHref);

  return (
    <FadeInView>
      <div className="mb-6 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <h2
          className={[
            "font-condensed font-black uppercase leading-none tracking-[0.02em]",
            "text-[24px] md:text-[28px]",
            light ? "text-white" : "text-text-primary",
          ].join(" ")}
        >
          {highlightPosition === "start" && highlight ? (
            <span className="text-orange">{highlight} </span>
          ) : null}
          <span>{title}</span>
          {highlightPosition === "end" && highlight ? (
            <span className="text-orange">{highlight}</span>
          ) : null}
        </h2>

        {showLink ? (
          <Link
            href={linkHref as string}
            className="flex shrink-0 items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-orange transition-opacity duration-150 hover:opacity-70"
          >
            <span>{linkText}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </FadeInView>
  );
}
