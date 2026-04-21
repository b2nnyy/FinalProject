import { Fragment } from "react";
import { readSourcesList } from "@/lib/content";

/**
 * Render a string with any URLs converted to clickable links. Everything else
 * is rendered as plain text so typography stays clean.
 */
function LinkifiedText({ text }: { text: string }) {
  // Capturing split: even indices are plain text, odd indices are matched URLs.
  const parts = text.split(/(https?:\/\/[^\s)]+[^\s).,;:'"])/gi);

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-ink transition-colors duration-300 underline underline-offset-2 decoration-accent/30 hover:decoration-ink/30 break-words"
          >
            {part}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

interface SourceSection {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  file: string;
}

const sections: SourceSection[] = [
  {
    id: "home",
    eyebrow: "Essay 1",
    title: "Home",
    subtitle: "Albany, New York",
    file: "Home/Sources (1).docx",
  },
  {
    id: "destination",
    eyebrow: "Essay 2",
    title: "Destination",
    subtitle: "Arriving in Philadelphia",
    file: "Destination/Sources_List_BenInglee.pdf",
  },
  {
    id: "guide",
    eyebrow: "Essay 3",
    title: "A Day in Philadelphia",
    subtitle: "The City, Now Known",
    file: "Guide/Sources_List_BenInglee.docx",
  },
];

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function parseDestinationReferences(paragraphs: string[]): string[] {
  const text = normalizeWhitespace(paragraphs.join(" "));
  const refs: string[] = [];
  const blockRegex =
    /Title:\s*([\s\S]*?)\s+Author\/Org:\s*([\s\S]*?)\s+Type:\s*([\s\S]*?)\s+Date:\s*([\s\S]*?)\s+Link:\s*(https?:\/\/[^\s]+)/g;

  let match: RegExpExecArray | null;
  while ((match = blockRegex.exec(text)) !== null) {
    const title = normalizeWhitespace(match[1]);
    const author = normalizeWhitespace(match[2]);
    const date = normalizeWhitespace(match[4]);
    const url = match[5].trim();
    refs.push(`${author}. ${title}. ${date}. ${url}`);
  }

  return refs;
}

function sanitizeReferences(sectionId: string, paragraphs: string[]): string[] {
  if (sectionId === "destination") {
    return parseDestinationReferences(paragraphs);
  }

  return paragraphs
    .map((p) => normalizeWhitespace(p))
    .filter((p) => p.length > 0)
    .filter((p) => !/^sources:?$/i.test(p))
    .filter((p) => !/^sources list$/i.test(p))
    .filter((p) => !/^ben\s*inglee$/i.test(p))
    .filter((p) => !/^msp\s*3296/i.test(p))
    .filter((p) => !/^\w+\s+\d{1,2},?\s+\d{4}$/.test(p))
    .filter((p) => !/^final reflection:? sources$/i.test(p))
    .filter((p) => /^\d+\.\s+/.test(p) || /https?:\/\//.test(p));
}

export default async function SourcesPage() {
  const sectionsWithContent = await Promise.all(
    sections.map(async (section) => ({
      ...section,
      paragraphs: sanitizeReferences(
        section.id,
        await readSourcesList(section.file)
      ),
    }))
  );

  return (
    <article className="px-6 sm:px-8 pt-16 pb-8 md:pt-24 md:pb-12">
      {/* Header */}
      <div className="mx-auto max-w-essay">
        <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-muted-light">
          References
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] tracking-tight text-ink mt-4 leading-[1.15]">
          Sources
        </h1>

        <p className="mt-5 font-serif text-lg text-ink-light italic leading-[1.7]">
          Reference citations only.
        </p>

        <hr className="decorative-rule mt-8 mb-12" />

        {/* Table of contents */}
        <nav className="mb-20">
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.25em] text-muted mb-5">
            Contents
          </p>
          <ul className="space-y-3">
            {sectionsWithContent.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-baseline gap-4 text-ink hover:text-accent transition-colors duration-300"
                >
                  <span className="font-sans text-[0.6875rem] uppercase tracking-[0.25em] text-muted-light group-hover:text-accent transition-colors">
                    {s.eyebrow}
                  </span>
                  <span className="font-serif text-[1.0625rem]">
                    {s.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Sections */}
      <div className="mx-auto max-w-essay">
        {sectionsWithContent.map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-24 ${idx > 0 ? "mt-20 md:mt-24" : ""}`}
          >
            <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-muted-light">
              {section.eyebrow}
            </p>

            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-ink mt-3 leading-[1.2]">
              {section.title}
            </h2>

            {section.subtitle && (
              <p className="mt-2 font-serif text-lg text-ink-light italic">
                {section.subtitle}
              </p>
            )}

            <hr className="decorative-rule mt-6 mb-8" />

            <div className="space-y-5">
              {section.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[1rem] text-ink/85 leading-[1.75]"
                >
                  <LinkifiedText text={p} />
                </p>
              ))}
              {section.paragraphs.length === 0 && (
                <p className="text-[0.95rem] text-muted">
                  No citation entries found for this section.
                </p>
              )}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
