import Image from "next/image";
import { readDocx } from "@/lib/content";

export default async function AboutPage() {
  const paragraphs = await readDocx("authors bio.docx", true);

  return (
    <article className="px-6 sm:px-8 pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="mx-auto max-w-page">
        <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-muted-light">
          Author
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] tracking-tight text-ink mt-4 leading-[1.15]">
          About
        </h1>

        <hr className="decorative-rule mt-8 mb-12" />

        <div className="flex flex-col md:flex-row gap-10 md:gap-14">
          {/* Photo */}
          <div className="md:w-[38%] md:flex-shrink-0">
            <div className="md:sticky md:top-24">
              <figure className="relative w-full aspect-[4/5] overflow-hidden bg-cream-dark">
                <Image
                  src="/about.jpg"
                  alt="Ben Inglee"
                  fill
                  sizes="(min-width: 768px) 38vw, 100vw"
                  className="object-cover"
                  priority
                />
              </figure>
              <p className="mt-3 font-sans text-[0.6875rem] uppercase tracking-[0.25em] text-muted-light">
                Ben Inglee
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="md:w-[62%]">
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

            <hr className="decorative-rule mt-14 mb-8" />

            <p className="text-[0.875rem] font-sans text-muted tracking-wide">
              Music&ensp;&middot;&ensp;
              <a
                href="https://open.spotify.com/search/b2nny"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-ink transition-colors duration-300 underline underline-offset-2 decoration-accent/30 hover:decoration-ink/30"
              >
                b2nny
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
