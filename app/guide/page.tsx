import { readDocx, readTransformation } from "@/lib/content";
import TransformationSidebar from "@/components/TransformationSidebar";
import SourcesLink from "@/components/SourcesLink";

export default async function GuidePage() {
  const paragraphs = await readDocx("Guide/Guide_Revised_BenInglee.docx", true);
  const items = await readTransformation(
    "Transformations/guide transformation.docx"
  );

  return (
    <article className="px-6 sm:px-8 pt-16 pb-8 md:pt-24 md:pb-12">
      {/* Header */}
      <div className="mx-auto max-w-page">
        <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-muted-light">
          Essay
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] tracking-tight text-ink mt-4 leading-[1.15]">
          Guide
        </h1>

        <p className="mt-3 font-serif text-xl text-ink-light italic">
          A Day in Philadelphia
        </p>

        <hr className="decorative-rule mt-8 mb-12" />
      </div>

      {/* Two-column layout */}
      <div className="mx-auto max-w-page">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Essay column */}
          <div className="lg:w-[62%] space-y-[1.4em]">
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

          {/* Sidebar column */}
          <div className="lg:w-[38%]">
            <div className="lg:sticky lg:top-24">
              <div className="lg:border-l lg:border-ink/[0.08] lg:pl-10">
                <TransformationSidebar
                  title="10 Spots Worth Stopping at in Philadelphia"
                  items={items}
                  compact
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sources link */}
        <div className="mt-16 md:mt-20 max-w-essay">
          <SourcesLink anchor="guide" />
        </div>
      </div>
    </article>
  );
}
