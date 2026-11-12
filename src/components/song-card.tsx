import type { Song } from "../content/music";
import { useSpotifyCover } from "../hooks/use-spotify-cover";
import type { SpotifyPlayer } from "../hooks/use-spotify-player";
import { PlayButton } from "./player-bar";

export default function SongCard({
  song,
  index,
  player,
}: {
  song: Song;
  index: number;
  player: SpotifyPlayer;
}) {
  const cover = useSpotifyCover(song.spotify, song.cover);

  return (
    <li className="flex flex-col rounded-xl border border-deep bg-ink p-5">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-deep">
        {cover ? (
          <img
            src={cover}
            alt={`Cover art for ${song.title}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-3xl text-dust">
            ♪
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-x-3">
        {/* <span className="text-sm text-dust tabular-nums">{String(index + 1).padStart(2, "0")}</span> */}
        <PlayButton player={player} link={song.spotify} label={song.title} />
      </div>
      <p className="mt-2 text-lg font-bold text-paper">{song.title}</p>
      <p className="text-sm text-dust">
        {song.artist}
        {song.year && <span className="tabular-nums"> · {song.year}</span>}
      </p>
      {song.note && <p className="mt-4 text-[0.9375rem] leading-relaxed text-dust">{song.note}</p>}
    </li>
  );
}
