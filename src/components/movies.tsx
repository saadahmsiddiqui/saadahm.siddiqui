import PageIntro from "./page-intro";
import ImdbTable from "./imdb-table";
import { MOVIES } from "../content/movies";

const movies = [...MOVIES]
  .sort((a, b) => a.year - b.year)
  .map((movie) => ({
    name: movie.name,
    year: String(movie.year),
    credit: movie.director,
    description: movie.description,
    imdbLink: movie.imdbLink,
  }));

export default function Movies() {
  return (
    <>
      <PageIntro title="Movies">
        Films that have left a lasting impression.
      </PageIntro>

      <section className="mt-20">
        <ImdbTable items={movies} creditLabel="Director" />
      </section>
    </>
  );
}
