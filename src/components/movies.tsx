import PageIntro from "./page-intro";
import { MOVIES } from "../content/movies";
import { useVisibleRowsHeight } from "../hooks/use-visible-rows-height";

const VISIBLE_MOVIES = 10;
const movies = [...MOVIES].sort((a, b) => a.year - b.year);

export default function Movies() {
  const movieTable = useVisibleRowsHeight(VISIBLE_MOVIES);

  return (
    <>
      <PageIntro title="Movies">
        Films that have left a lasting impression.
      </PageIntro>

      <section className="mt-20">
        <div
          className="scrollbar-sleek overflow-y-auto border-y border-deep"
          style={{ maxHeight: movieTable.height }}
        >
          <table
            ref={movieTable.ref}
            className="w-full border-separate border-spacing-0 text-left"
          >
            <thead className="[&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:border-b [&_th]:border-deep [&_th]:bg-ink">
              <tr className="text-xs text-dust">
                <th
                  scope="col"
                  className="w-10 py-2 pr-4 text-right font-normal"
                >
                  #
                </th>
                <th scope="col" className="py-2 pr-4 font-normal">
                  Title
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pr-4 font-normal sm:table-cell"
                >
                  Director
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
              {movies.map((movie, i) => (
                <tr
                  key={movie.name}
                  className={`group align-middle ${movie.imdbLink ? "cursor-pointer" : ""}`}
                  onClick={(e) => {
                    // The title link handles its own clicks; don't hijack text selection.
                    if (!movie.imdbLink) return;
                    if ((e.target as HTMLElement).closest("a")) return;
                    if (window.getSelection()?.toString()) return;
                    window.open(
                      movie.imdbLink,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                >
                  <td className="py-3 pr-4 text-right text-sm tabular-nums text-dust">
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3 pr-4">
                    <p className="font-bold leading-snug text-paper">
                      {movie.imdbLink ? (
                        <a
                          href={movie.imdbLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group-hover:text-lamp"
                        >
                          {movie.name}
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
                        movie.name
                      )}
                    </p>
                    <p className="text-sm text-dust sm:hidden">
                      {movie.director} · {movie.year}
                    </p>
                    <p className="text-sm text-dust md:hidden max-sm:hidden">
                      {movie.year}
                    </p>
                    {movie.description && (
                      <p className="mt-1 text-xs leading-relaxed text-dust">
                        {movie.description}
                      </p>
                    )}
                  </td>
                  <td className="hidden py-3 pr-4 text-sm text-dust sm:table-cell">
                    {movie.director}
                  </td>
                  <td className="hidden py-3 pr-4 text-sm tabular-nums text-dust md:table-cell">
                    {movie.year}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
