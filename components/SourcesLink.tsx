import Link from "next/link";

interface Props {
  anchor: string;
}

export default function SourcesLink({ anchor }: Props) {
  return (
    <div className="pt-6 border-t border-ink/[0.06]">
      <Link
        href={`/sources#${anchor}`}
        className="group inline-flex items-center gap-2 font-sans text-[0.6875rem] uppercase tracking-[0.25em] text-muted hover:text-accent transition-colors duration-300"
      >
        See Sources &amp; References
        <svg
          className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
}
