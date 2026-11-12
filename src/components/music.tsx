import type { ReactNode } from "react";
import { /* artists, */ onRepeat, songs /* , stories */ } from "../content/music";
import { useSpotifyPlayer } from "../hooks/use-spotify-player";
// import { spotifyUri } from "../utilts"; // used by Stories
import Container from "./container";
import PageIntro from "./page-intro";
import { PlayButton, PlayerBar } from "./player-bar";
import SongCard from "./song-card";
// import Timeline from "./timeline"; // used by Stories

function Section({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <section className="mt-20" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="mb-4 text-sm text-dust">
        {label}
      </h2>
      {children}
    </section>
  );
}

export default function Music() {
  // One player for the whole page; every Play button sends its link here.
  const player = useSpotifyPlayer();

  return (
    <Container className={player.current ? "pb-28" : ""}>
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
            <PlayButton player={player} link={onRepeat.spotify} label={onRepeat.title} />
          </div>
        </Section>
      )}

      {songs.length > 0 && (
        <Section id="songs" label="Songs">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {songs.map((song, i) => (
              <SongCard key={`${song.title}-${song.artist}`} song={song} index={i} player={player} />
            ))}
          </ul>
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

      <PlayerBar player={player} />
    </Container>
  );
}
