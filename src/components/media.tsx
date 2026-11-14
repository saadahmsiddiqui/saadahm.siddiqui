import { useSpotifyPlayer } from "../hooks/use-spotify-player";
import Container from "./container";
import Movies from "./movies";
import Music from "./music";
import { PlayerBar } from "./player-bar";

export default function Media() {
  const player = useSpotifyPlayer();

  return (
    <Container className={player.current ? "pb-28" : ""}>
      <Music />
      <Movies />

      <PlayerBar player={player} />
    </Container>
  );
}
