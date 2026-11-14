import type { Song } from "../content/music";
import { useSpotifyCover } from "../hooks/use-spotify-cover";
import type { SpotifyPlayer } from "../hooks/use-spotify-player";
import { PlayButton } from "./player-bar";

export default function SongCard({
  song,
  player,
}: {
  song: Song;
  index: number;
  player: SpotifyPlayer;
}) {
  const cover = useSpotifyCover(song.spotify, song.cover);

  return (
    <li className="flex flex-col rounded-xl border border-deep bg-ink p-5">
      <div className="flex items-center gap-x-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-deep">
          {cover ? (
            <img
              src={cover}
              alt={`Cover art for ${song.title}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-xl text-dust">
              ♪
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-bold leading-snug text-paper">{song.title}</p>
          <p className="text-sm text-dust">
            {song.artist}
            {song.year && <span className="tabular-nums"> · {song.year}</span>}
          </p>
        </div>
      </div>
      {song.note && <p className="mt-4 text-xs leading-relaxed text-dust">{song.note}</p>}
      <div className="mt-auto pt-4">
        <PlayButton player={player} link={song.spotify} label={song.title} />
      </div>
    </li>
  );
}
