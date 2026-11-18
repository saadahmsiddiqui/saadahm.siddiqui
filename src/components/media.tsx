import { useSpotifyPlayer } from "../hooks/use-spotify-player";
import Container from "./container";
import Movies from "./movies";
import Music from "./music";
import { PlayerBar } from "./player-bar";
import TvShows from "./tv-shows";

export default function Media() {
  const player = useSpotifyPlayer();

  return (
    <Container className={player.current ? "pb-28" : ""}>
      <Music player={player} />
      <Movies />
      <TvShows />

      <PlayerBar player={player} />
    </Container>
  );
}
