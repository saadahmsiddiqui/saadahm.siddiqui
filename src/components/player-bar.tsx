import type { SpotifyPlayer } from "../hooks/use-spotify-player";
import { spotifyUri } from "../utilts";

/** Player pinned to the bottom of the viewport. Slides in once something is played. */
export function PlayerBar({ player }: { player: SpotifyPlayer }) {
  const active = player.current !== null;

  return (
    <div
      inert={!active}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-deep bg-ink/90 backdrop-blur transition-transform duration-300 ${
        active ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
        {player.failed && player.current && (
          <p className="flex-1 text-sm text-dust">
            The Spotify player couldn’t load.{" "}
            <a href={player.current.link} target="_blank" rel="noreferrer" className="text-fog hover:text-lamp">
              Open in Spotify ↗
            </a>
          </p>
        )}
        <div
          ref={player.hostRef}
          className={`min-w-0 flex-1 [&_iframe]:block [&_iframe]:rounded-xl ${player.failed ? "hidden" : ""}`}
        />
        <button
          type="button"
          onClick={player.close}
          aria-label="Close player"
          className="text-dust hover:text-lamp"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

/** Play/pause control for anything with a Spotify link. Renders nothing without one. */
export function PlayButton({
  player,
  link,
  label,
  className = "",
}: {
  player: SpotifyPlayer;
  link?: string;
  label: string;
  className?: string;
}) {
  if (!link || !spotifyUri(link)) return null;
  const current = player.isCurrent(link);
  const playing = current && !player.paused;

  return (
    <button
      type="button"
      onClick={() => (current ? player.toggle() : player.play(link))}
      aria-label={`${playing ? "Pause" : "Play"} ${label}`}
      className={`text-sm hover:text-lamp ${current ? "text-lamp" : "text-dust"} ${className}`}
    >
      {playing ? "Pause ❚❚" : "Play ▸"}
    </button>
  );
}
