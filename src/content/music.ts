// Music page content. For any `spotify` field, paste the share link from the
// Spotify app (Share → Copy link), e.g. https://open.spotify.com/track/<id>?si=...
// Track, album, playlist and artist links all work.

export type Song = {
  title: string;
  artist: string;
  year?: string;
  note?: string;
  spotify?: string;
  /** Optional image path/URL; otherwise the cover is fetched from the Spotify link. */
  cover?: string;
};

export type Artist = {
  name: string;
  genre?: string;
  goTo?: string;
  spotify?: string;
};

export type Story = {
  id: string;
  when: string;
  title: string;
  song?: string;
  body: string;
  spotify?: string;
};

/** The one song currently on repeat. Set to `null` to hide the section. */
export const onRepeat: {
  title: string;
  artist: string;
  since: string;
  spotify: string;
} | null = null;

// TODO: replace the placeholders below with your own picks.
export const songs: Song[] = [
  {
    title: "Numa Ilha",
    artist: "Marina Sena",
    year: "2026",
    note: "Magical adventures with someone special.",
    spotify:
      "https://open.spotify.com/track/2MitriRScA3ZKpVd1lXAbm?si=b8de17e594b94c0e",
  },
  {
    title: "Don't Delete The Kisses",
    artist: "Wolf Alice",
    year: "2024",
    note: "Modern romance with a cyberpunk twist.",
    spotify:
      "https://open.spotify.com/track/1LomCMl5wD3MPVlC6smUHe?si=fd1e66dbca5343b1",
  },
  {
    title: "505",
    artist: "Arctic Monkeys",
    year: "2024",
    note: "A song that takes me back to a specific moment in time, evoking nostalgia and longing.",
    spotify:
      "https://open.spotify.com/track/0BxE4FqsDD1Ot4YuBXwAPp?si=6f1be2865d83469f",
  },
  {
    title: "One of the girls",
    artist: "The Weeknd",
    year: "2024",
    note: "Some evenings she would play this song on repeat, and it would become the soundtrack to our nights together.",
    spotify:
      "https://open.spotify.com/track/1VNWdmXSbaNrnWod10WIL0?si=eee14af254d443e3",
  },
  {
    title: "I Hold You",
    artist: "CLANN",
    year: "2022",
    note: "The air was thick with everything we hadn’t said yet, and that song translated every pulse. Now, those first few notes pull me straight back to the night the world narrowed down to just the two of us.",
    spotify:
      "https://open.spotify.com/track/1FJBPuVMG4XkKIpE7tmhDm?si=dd14fea8cc5b4b37",
  },
  {
    title: "Ma Meilleure Ennemie",
    artist: "Stromae, Coldplay",
    year: "2024",
    note: "",
    spotify:
      "https://open.spotify.com/track/1ZHvGQZNz6HLbxhAtu7pin?si=1baa96cf12aa45ea",
  },
];

export const artists: Artist[] = [
  {
    name: "Artist name",
    genre: "Genre · era",
    goTo: "Their track you always come back to",
    spotify: "",
  },
];

export const stories: Story[] = [
  {
    id: "first-story",
    when: "2019",
    title: "A headline for the story",
    song: "Song title — Artist",
    body: "A short paragraph about the moment, the place, the people.",
  },
];
