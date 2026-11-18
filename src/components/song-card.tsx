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
    <tr className="align-middle">
      <td className="py-3 pr-4 text-right text-sm tabular-nums text-dust">
        {String(index + 1).padStart(2, "0")}
      </td>
      <td className="py-3 pr-4">
        <div className="flex items-center gap-x-3">
          <div className="relative size-10 shrink-0 overflow-hidden rounded bg-deep">
            {cover ? (
              <img
                src={cover}
                alt={`Cover art for ${song.title}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-dust">
                ♪
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-bold leading-snug text-paper">{song.title}</p>
            <p className="text-sm text-dust sm:hidden">{song.artist}</p>
            {song.note && <p className="mt-1 text-xs leading-relaxed text-dust">{song.note}</p>}
          </div>
        </div>
      </td>
      <td className="hidden py-3 pr-4 text-sm text-dust sm:table-cell">{song.artist}</td>
      <td className="hidden py-3 pr-4 text-sm tabular-nums text-dust md:table-cell">{song.year}</td>
      <td className="py-3 pr-3 text-right">
        <PlayButton player={player} link={song.spotify} label={song.title} />
      </td>
    </tr>
  );
}
