import type { ReactNode } from "react";
import SourcesLink from "./SourcesLink";

interface Props {
  pageHeading: string;
  essayLabel: string;
  essayTitle: string;
  paragraphs: string[];
  sidebar?: ReactNode;
  sourcesAnchor?: string;
}

export default function EssayLayout({
  pageHeading,
  essayLabel,
  essayTitle,
  paragraphs,
  sidebar,
  sourcesAnchor,
}: Props) {
  return (
    <article className="px-6 sm:px-8 pt-16 pb-8 md:pt-24 md:pb-12">
      {/* Header */}
      <div className="mx-auto max-w-essay">
        <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-muted-light">
          {essayLabel}
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] tracking-tight text-ink mt-4 leading-[1.15]">
          {pageHeading}
        </h1>

        {essayTitle !== pageHeading && (
          <p className="mt-3 font-serif text-xl text-ink-light italic">
            {essayTitle}
          </p>
        )}

        <hr className="decorative-rule mt-8 mb-12" />
      </div>

      {/* Essay body */}
      <div className="mx-auto max-w-essay">
        <div className="space-y-[1.4em]">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-essay-lg text-ink/85 leading-[1.8] ${
                i === 0 ? "drop-cap" : ""
              }`}
            >
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* Sidebar / Transformation */}
      {sidebar && (
        <div className="mx-auto max-w-essay mt-18 md:mt-22">
          <hr className="decorative-rule mb-12" />
          {sidebar}
        </div>
      )}

      {/* Sources link */}
      {sourcesAnchor && (
        <div className="mx-auto max-w-essay mt-16 md:mt-20">
          <SourcesLink anchor={sourcesAnchor} />
        </div>
      )}
    </article>
  );
}
