import { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { GAMES, gameCoverSrc, type Game } from "../content/gaming";

const games = [...GAMES].sort((a, b) => a.year - b.year);

const lovedGames = games.filter((game) => game.loved);

const BATCH_SIZE = 12;

function Cover({ game }: { game: Game }) {
  const [failed, setFailed] = useState(false);
  const src = gameCoverSrc(game.cover);

  return (
    <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-deep">
      {src && !failed ? (
        <img
          src={src}
          alt={`Cover art for ${game.name}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center p-4 text-center text-lg font-light text-dust"
        >
          {game.name}
        </span>
      )}
      {game.loved && (
        // Always visible on touch screens, which have no hover.
        <span className="absolute right-2 top-2 grid size-8 scale-75 place-items-center rounded-full bg-ink/80 text-lamp opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 [@media(hover:none)]:scale-100 [@media(hover:none)]:opacity-100">
          <FaHeart aria-hidden="true" className="size-4" />
          <span className="sr-only">Loved</span>
        </span>
      )}
    </div>
  );
}

function GameCard({ game }: { game: Game }) {
  const body = (
    <>
      <Cover game={game} />
      <p className="mt-3 font-bold leading-snug text-paper group-hover:text-lamp">
        {game.name}
        {game.link && (
          <span aria-hidden="true" className="ml-1 text-dust group-hover:text-lamp">
            ↗
          </span>
        )}
      </p>
      <p className="text-sm text-dust">
        <span className="tabular-nums">{game.year}</span> · {game.developer}
      </p>
      {game.description && (
        <p className="mt-2 text-xs leading-relaxed text-dust">{game.description}</p>
      )}
    </>
  );

  return (
    <li>
      {game.link ? (
        <a href={game.link} target="_blank" rel="noopener noreferrer" className="group block">
          {body}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <div className="group">{body}</div>
      )}
    </li>
  );
}

function GameGrid({ games }: { games: Game[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </ul>
  );
}

/** The games marked `loved` in games.json. */
export function LovedGames() {
  if (lovedGames.length === 0) return null;

  return (
    <section className="mt-16">
      <p className="mb-4 font-sans text-sm text-dust">Games I absolutely loved</p>
      <GameGrid games={lovedGames} />
    </section>
  );
}

/** Every game played, as cover-art tiles sorted by release year. Shows 12 at
 *  first and reveals 12 more each time the end of the grid scrolls into view. */
export default function Games() {
  const [visible, setVisible] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const hasMore = visible < games.length;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible((n) => Math.min(n + BATCH_SIZE, games.length));
        }
      },
      // Start loading a little before the end of the grid is reached.
      { rootMargin: "0px 0px 400px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
    // Re-observe after each batch so a sentinel still in view triggers again.
  }, [visible, hasMore]);

  if (games.length === 0) return null;

  return (
    <section className="mt-16">
      <p className="mb-4 font-sans text-sm text-dust">Games I've played</p>
      <GameGrid games={games.slice(0, visible)} />
      {hasMore && <div ref={sentinelRef} aria-hidden="true" className="h-px" />}
    </section>
  );
}
