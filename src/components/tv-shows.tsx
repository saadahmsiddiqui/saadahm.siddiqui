import { useState } from "react";
import PageIntro from "./page-intro";
import { coverSrc, TV_SHOWS, type TvShow } from "../content/tv-shows";

const shows = [...TV_SHOWS].sort((a, b) => a.startYear - b.startYear);

function years(show: TvShow) {
  if (show.endYear === show.startYear) return String(show.startYear);
  return `${show.startYear}–${show.endYear ?? ""}`;
}

function Poster({ show }: { show: TvShow }) {
  const [failed, setFailed] = useState(false);
  const src = coverSrc(show.cover);

  return (
    <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-deep">
      {src && !failed ? (
        <img
          src={src}
          alt={`Poster for ${show.name}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center p-4 text-center text-lg font-light text-dust"
        >
          {show.name}
        </span>
      )}
    </div>
  );
}

function ShowCard({ show }: { show: TvShow }) {
  const body = (
    <>
      <Poster show={show} />
      <p className="mt-3 font-bold leading-snug text-paper group-hover:text-lamp">
        {show.name}
        {show.imdbLink && (
          <span
            aria-hidden="true"
            className="ml-1 text-dust group-hover:text-lamp"
          >
            ↗
          </span>
        )}
      </p>
      <p className="text-sm text-dust">
        <span className="tabular-nums">{years(show)}</span> · {show.creator}
      </p>
      {show.description && (
        <p className="mt-2 text-xs leading-relaxed text-dust">
          {show.description}
        </p>
      )}
    </>
  );

  return (
    <li>
      {show.imdbLink ? (
        <a
          href={show.imdbLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          {body}
          <span className="sr-only"> (opens IMDb in a new tab)</span>
        </a>
      ) : (
        <div className="group">{body}</div>
      )}
    </li>
  );
}

export default function TvShows() {
  if (shows.length === 0) return null;

  return (
    <>
      <PageIntro title="TV Shows">
        Series I've watched start to finish, some more than once.
      </PageIntro>

      <section className="mt-20">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {shows.map((show) => (
            <ShowCard key={show.name} show={show} />
          ))}
        </ul>
      </section>
    </>
  );
}
