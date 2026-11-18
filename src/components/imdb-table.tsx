import { useVisibleRowsHeight } from "../hooks/use-visible-rows-height";

export type ImdbTableItem = {
  name: string;
  /** Shown in the "Year" column, e.g. "2014" or "2008–2013". */
  year: string;
  /** Director for films, creator for shows. */
  credit: string;
  description?: string;
  imdbLink?: string;
};

const VISIBLE_ROWS = 10;

/** Numbered table of titles; clicking a row opens its IMDb page. */
export default function ImdbTable({
  items,
  creditLabel,
}: {
  items: ImdbTableItem[];
  creditLabel: string;
}) {
  const table = useVisibleRowsHeight(VISIBLE_ROWS);

  return (
    <div
      className="scrollbar-sleek overflow-y-auto border-y border-deep"
      style={{ maxHeight: table.height }}
    >
      <table
        ref={table.ref}
        className="w-full border-separate border-spacing-0 text-left"
      >
        <thead className="[&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:border-b [&_th]:border-deep [&_th]:bg-ink">
          <tr className="text-xs text-dust">
            <th scope="col" className="w-10 py-2 pr-4 text-right font-normal">
              #
            </th>
            <th scope="col" className="py-2 pr-4 font-normal">
              Title
            </th>
            <th
              scope="col"
              className="hidden py-2 pr-4 font-normal sm:table-cell"
            >
              {creditLabel}
            </th>
            <th
              scope="col"
              className="hidden py-2 pr-4 font-normal md:table-cell"
            >
              Year
            </th>
          </tr>
        </thead>
        <tbody className="[&_td]:border-b [&_td]:border-deep [&>tr:last-child>td]:border-b-0">
          {items.map((item, i) => (
            <tr
              key={item.name}
              className={`group align-middle ${item.imdbLink ? "cursor-pointer" : ""}`}
              onClick={(e) => {
                // The title link handles its own clicks; don't hijack text selection.
                if (!item.imdbLink) return;
                if ((e.target as HTMLElement).closest("a")) return;
                if (window.getSelection()?.toString()) return;
                window.open(item.imdbLink, "_blank", "noopener,noreferrer");
              }}
            >
              <td className="py-3 pr-4 text-right text-sm tabular-nums text-dust">
                {String(i + 1).padStart(2, "0")}
              </td>
              <td className="py-3 pr-4">
                <p className="font-bold leading-snug text-paper">
                  {item.imdbLink ? (
                    <a
                      href={item.imdbLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group-hover:text-lamp"
                    >
                      {item.name}
                      <span
                        aria-hidden="true"
                        className="ml-1 text-dust group-hover:text-lamp"
                      >
                        ↗
                      </span>
                      <span className="sr-only">
                        {" "}
                        (opens IMDb in a new tab)
                      </span>
                    </a>
                  ) : (
                    item.name
                  )}
                </p>
                <p className="text-sm text-dust sm:hidden">
                  {item.credit} · {item.year}
                </p>
                <p className="text-sm text-dust md:hidden max-sm:hidden">
                  {item.year}
                </p>
                {item.description && (
                  <p className="mt-1 text-xs leading-relaxed text-dust">
                    {item.description}
                  </p>
                )}
              </td>
              <td className="hidden py-3 pr-4 text-sm text-dust sm:table-cell">
                {item.credit}
              </td>
              <td className="hidden py-3 pr-4 text-sm tabular-nums text-dust md:table-cell">
                {item.year}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
