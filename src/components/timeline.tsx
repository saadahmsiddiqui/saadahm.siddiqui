export type TimelineItem = {
  id: string;
  when: string;
  title: string;
  detail?: string;
  description?: string;
  meta?: string;
  href?: string;
};

/**
 * Vertical timeline, newest first. The rail runs between the first and last
 * markers; the most recent marker is filled.
 */
export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol>
      {items.map((item, i) => {
        const first = i === 0;
        const last = i === items.length - 1;

        return (
          <li
            key={item.id}
            className="grid grid-cols-[4.25rem_1.25rem_1fr] gap-x-3 sm:grid-cols-[5.5rem_2rem_1fr] sm:gap-x-4"
          >
            <span className="pt-[0.25rem] text-sm text-dust tabular-nums">{item.when}</span>

            <span aria-hidden="true" className="relative flex justify-center">
              <span
                className={`absolute w-px bg-deep ${first ? "top-[0.875rem]" : "top-0"} ${
                  last ? "h-[0.875rem]" : "bottom-0"
                }`}
              />
              <span
                className={`relative mt-[0.625rem] h-2 w-2 rounded-full border ${
                  first ? "border-paper bg-paper" : "border-dust bg-ink"
                }`}
              />
            </span>

            <div
              className={`lg:grid lg:grid-cols-[1fr_auto] lg:items-start lg:gap-x-8 ${
                last ? "" : "pb-8"
              }`}
            >
              <div>
                {item.href ? (
                  <a href={item.href} className="text-lg font-bold text-paper hover:text-lamp">
                    {item.title}
                  </a>
                ) : (
                  <p className="text-lg font-bold text-paper">{item.title}</p>
                )}
                {item.detail && <p className="text-dust">{item.detail}</p>}
              </div>
              {item.meta && (
                <p className="mt-1 text-sm text-dust lg:mt-0 lg:pt-[0.25rem] lg:text-right">
                  {item.meta}
                </p>
              )}
              {item.description && (
                <p className="mt-2 max-w-[42rem] text-[0.9375rem] leading-relaxed text-dust lg:col-span-2">
                  {item.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
