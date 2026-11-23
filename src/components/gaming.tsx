import Container from "./container";
import GamerIds from "./gamer-ids";
import Games, { LovedGames } from "./games";
import PageIntro from "./page-intro";

export default function Gaming() {

    return (
        <Container>
            <PageIntro title="Gaming">
                Games have been a part of my life for as long as I can remember. I’m drawn to great
                stories, worlds worth getting lost in, and the occasional late-night session with
                friends. Here are the games I’m playing now and the ones that stayed with me.
            </PageIntro>
            <GamerIds />
            <LovedGames />
            <Games />
        </Container>
    )
}