import Link from "next/link";

const essays = [
  {
    href: "/home",
    title: "Home",
    subtitle: "Albany, New York",
    description: "A personal essay about growing up in Albany, NY — the sounds, routines, and quiet familiarity that shaped everything after.",
  },
  {
    href: "/destination",
    title: "Destination",
    subtitle: "Arriving in Philadelphia",
    description: "A narrative about landing in a city that doesn't slow down, and the uncomfortable first steps of building a new life.",
  },
  {
    href: "/guide",
    title: "A Day in Philadelphia",
    subtitle: "The City, Now Known",
    description: "A time-of-day guide to experiencing the city from someone who learned it block by block, not from a guidebook.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center px-6 sm:px-8">
      {/* Hero */}
      <div className="flex flex-col items-center pt-24 pb-8 md:pt-36 md:pb-12">
        <p className="text-[0.6875rem] font-sans uppercase tracking-[0.35em] text-muted mb-6">
          Travel Writing Portfolio
        </p>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight text-ink text-center leading-[1.1]">
          Ben Inglee
        </h1>

        <hr className="decorative-rule-center mt-8 mb-10" />

        <p className="max-w-md text-center text-[1.0625rem] leading-[1.8] text-ink-light font-serif">
          Three essays tracing an arc from Albany, where home was given, to
          Philadelphia, where it had to be built&thinsp;&mdash;&thinsp;and the slow work
          of learning to belong somewhere new.
        </p>
      </div>

      {/* Essay Cards */}
      <div className="w-full max-w-3xl mt-12 mb-8 md:mt-16">
        <div className="grid gap-px sm:grid-cols-3 bg-ink/[0.06] border border-ink/[0.06]">
          {essays.map(({ href, title, subtitle, description }, idx) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col bg-cream px-7 py-9 sm:py-10 transition-colors duration-300 hover:bg-cream-dark"
            >
              <span className="text-[0.6875rem] font-sans uppercase tracking-[0.2em] text-muted-light">
                Part {idx + 1}
              </span>

              <h2 className="font-serif text-[1.375rem] text-ink mt-3 group-hover:text-accent transition-colors duration-300">
                {title}
              </h2>

              <p className="text-[0.75rem] font-sans text-accent tracking-wide mt-1 italic">
                {subtitle}
              </p>

              <p className="mt-4 text-[0.875rem] text-muted leading-relaxed flex-1">
                {description}
              </p>

              <span className="mt-6 inline-flex items-center gap-1.5 text-[0.6875rem] font-sans uppercase tracking-[0.2em] text-accent group-hover:text-accent-light transition-colors duration-300">
                Read
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
