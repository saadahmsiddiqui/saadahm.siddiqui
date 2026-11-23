import type { CSSProperties } from "react";
import { entriesOfKind, formatStarted, formatYears } from "../content/entries";
import { GAMES, gameCoverSrc } from "../content/gaming";
import { photos } from "../content/photos";
import { coverSrc, TV_SHOWS } from "../content/tv-shows";

const CARDS = 5;

const isString = (src: string | undefined): src is string => Boolean(src);

// Each list reads its page's own content, so previews stay up to date.
const photoCards = photos.slice(-CARDS).map((photo) => photo.thumb);
const posterCards = TV_SHOWS.map((show) => coverSrc(show.cover)).filter(isString).slice(0, CARDS);
const gameCards = GAMES.filter((game) => game.loved)
  .sort((a, b) => a.year - b.year)
  .map((game) => gameCoverSrc(game.cover))
  .filter(isString)
  .slice(-CARDS);

const projectRows = entriesOfKind("project").map((entry) => ({
  title: entry.title,
  detail: entry.description,
  when: formatStarted(entry),
}));
const workRows = entriesOfKind("work").map((entry) => ({
  title: entry.title,
  detail: entry.detail,
  when: formatYears(entry),
}));

/** A hand of cards. --open (set by Explore) runs from 0, stacked, to 1, fanned out. */
function Fan({ images }: { images: string[] }) {
  return (
    <div className="relative h-48 w-full stage:h-full">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          style={{ "--i": i - (images.length - 1) / 2 } as CSSProperties}
          className="absolute inset-0 m-auto aspect-[2/3] w-[34%] max-w-28 translate-x-[calc(var(--i)*42%*var(--open))] translate-y-[calc(var(--i)*var(--i)*3%*var(--open))] rotate-[calc(var(--i)*6deg*var(--open))] rounded-md border border-deep object-cover stage:w-[38%] stage:max-w-none shadow-[0_8px_24px_-8px_rgb(0_0_0/0.7)] transition-[translate,rotate] duration-500 ease-out motion-reduce:transition-none"
        />
      ))}
    </div>
  );
}

function Rows({ rows }: { rows: { title: string; detail?: string; when: string }[] }) {
  return (
    <ul className="grid w-full gap-4 pl-9 stage:pl-0">
      {rows.slice(0, CARDS).map((row) => (
        <li key={row.title} className="flex items-baseline justify-between gap-6">
          <span className="min-w-0">
            <span className="block text-paper">{row.title}</span>
            {row.detail && <span className="line-clamp-2 text-sm text-dust">{row.detail}</span>}
          </span>
          <span className="shrink-0 text-sm text-dust tabular-nums">{row.when}</span>
        </li>
      ))}
    </ul>
  );
}

/** A glimpse of what is on the page at `to`. */
export default function ExplorePreview({ to }: { to: string }) {
  switch (to) {
    case "/projects":
      return <Rows rows={projectRows} />;
    case "/work-experience":
      return <Rows rows={workRows} />;
    case "/photography":
      return <Fan images={photoCards} />;
    case "/media":
      return <Fan images={posterCards} />;
    case "/gaming":
      return <Fan images={gameCards} />;
    default:
      return null;
  }
}
