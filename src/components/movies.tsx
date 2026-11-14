import PageIntro from "./page-intro";
import { MOVIES } from "../content/movies";

export default function Movies() {
  return (
    <>
      <PageIntro title="Movies">
        Films that have left a lasting impression.
      </PageIntro>

      <section className="mt-20">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 my-3">
          {MOVIES.sort((a, b) => a.year - b.year).map((movie) => (
            <li
              key={movie.name}
              className="border border-deep flex flex-col gap-1 p-4"
            >
              <h3 className="text-sm text-paper">{movie.name}</h3>
              <p className="text-xs text-dust">
                {movie.year} — {movie.director}
              </p>
              <p className="text-xs text-dust">{movie.description}</p>
              {movie.imdbLink && (
                <a
                  href={movie.imdbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline"
                >
                  View on IMDb
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
