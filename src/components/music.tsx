import type { ReactNode } from "react";
import { onRepeat, songs } from "../content/music";
import { SpotifyPlayer } from "../hooks/use-spotify-player";
import { useVisibleRowsHeight } from "../hooks/use-visible-rows-height";
import PageIntro from "./page-intro";
import { PlayButton } from "./player-bar";
import SongCard from "./song-card";

const VISIBLE_SONGS = 10;

function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-20" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="mb-4 text-sm text-dust">
        {label}
      </h2>
      {children}
    </section>
  );
}

export default function Music({ player }: { player: SpotifyPlayer }) {
  const songTable = useVisibleRowsHeight(VISIBLE_SONGS);

  return (
    <>
      <PageIntro title="Music">
        Songs I keep coming back to, and the people who made them.
      </PageIntro>

      {onRepeat && (
        <Section id="on-repeat" label={`On repeat since ${onRepeat.since}`}>
          <div className="flex items-baseline justify-between gap-x-3 border-y border-deep py-5">
            <p>
              <span className="text-paper">{onRepeat.title}</span>
              <span className="text-dust"> — {onRepeat.artist}</span>
            </p>
            <PlayButton
              player={player}
              link={onRepeat.spotify}
              label={onRepeat.title}
            />
          </div>
        </Section>
      )}

      {songs.length > 0 && (
        <Section id="songs" label="Songs">
          <div
            className="scrollbar-sleek overflow-y-auto border-y border-deep"
            style={{ maxHeight: songTable.height }}
          >
            <table
              ref={songTable.ref}
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
                    Artist
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pr-4 font-normal md:table-cell"
                  >
                    Year
                  </th>
                  <th scope="col" className="py-2 pr-3 text-right font-normal">
                    <span className="sr-only">Play</span>
                  </th>
                </tr>
              </thead>
              <tbody className="[&_td]:border-b [&_td]:border-deep [&>tr:last-child>td]:border-b-0">
                {songs.map((song, i) => (
                  <SongCard
                    key={`${song.title}-${song.artist}`}
                    song={song}
                    index={i}
                    player={player}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* {artists.length > 0 && (
        <Section id="artists" label="Artists">
          <ul className="grid gap-px overflow-hidden rounded-xl border border-deep bg-deep sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => (
              <li key={artist.name} className="flex flex-col bg-ink p-5">
                <p className="text-lg font-bold text-paper">{artist.name}</p>
                {artist.genre && <p className="text-sm text-dust">{artist.genre}</p>}
                {artist.goTo && (
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-dust">
                    Go-to: <span className="text-fog">{artist.goTo}</span>
                  </p>
                )}
                <PlayButton
                  player={player}
                  link={artist.spotify}
                  label={artist.name}
                  className="mt-auto self-start pt-4"
                />
              </li>
            ))}
          </ul>
        </Section>
      )} */}

      {/* {stories.length > 0 && (
        <Section id="stories" label="Stories">
          <Timeline
            items={stories.map((story) => ({
              id: story.id,
              when: story.when,
              title: story.title,
              detail: story.song,
              description: story.body,
              href: spotifyUri(story.spotify) ? story.spotify : undefined,
            }))}
          />
        </Section>
      )} */}
    </>
  );
}
