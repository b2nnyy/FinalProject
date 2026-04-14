import type { TransformationItem } from "@/lib/content";

interface Props {
  title: string;
  items: TransformationItem[];
  compact?: boolean;
}

export default function TransformationSidebar({
  title,
  items,
  compact = false,
}: Props) {
  return (
    <aside className={compact ? "text-sidebar" : ""}>
      <p className="font-sans text-[0.6875rem] uppercase tracking-[0.25em] text-muted mb-8">
        {title}
      </p>

      <ol className="list-none space-y-8">
        {items.map((item) => (
          <li key={item.number} className="relative pl-10">
            <span className="absolute left-0 top-0 font-sans text-[0.8125rem] font-semibold text-accent/70 tabular-nums leading-[1.65]">
              {String(item.number).padStart(2, "0")}
            </span>

            <h4 className="font-serif text-[1.0625rem] font-semibold text-ink leading-snug">
              {item.heading}
            </h4>

            {item.body && (
              <p className={`mt-2 text-ink-light leading-relaxed ${compact ? "text-sidebar" : "text-[0.9375rem]"}`}>
                {item.body}
              </p>
            )}
          </li>
        ))}
      </ol>
    </aside>
  );
}
