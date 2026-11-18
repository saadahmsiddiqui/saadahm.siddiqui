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
    note: "Evoking nostalgia and longing during our time in #123.",
    spotify:
      "https://open.spotify.com/track/0BxE4FqsDD1Ot4YuBXwAPp?si=6f1be2865d83469f",
  },
  {
    title: "One of the girls",
    artist: "The Weeknd",
    year: "2024",
    note: "Some evenings she would play this song on repeat.",
    spotify:
      "https://open.spotify.com/track/1VNWdmXSbaNrnWod10WIL0?si=eee14af254d443e3",
  },
  {
    title: "I Hold You",
    artist: "CLANN",
    year: "2022",
    note: "The time in Islamabad when the nights were long and conversations were endless.",
    spotify:
      "https://open.spotify.com/track/1FJBPuVMG4XkKIpE7tmhDm?si=dd14fea8cc5b4b37",
  },
  {
    title: "Ma Meilleure Ennemie",
    artist: "Stromae, Coldplay",
    year: "2024",
    note: "Reminds me of my french adventures in the medinas of Rabat, Morocco.",
    spotify:
      "https://open.spotify.com/track/1ZHvGQZNz6HLbxhAtu7pin?si=1baa96cf12aa45ea",
  },
  {
    title: "Same Place",
    artist: "JOY",
    year: "2016",
    note: "Same place reminds me of someone I have long lost connection to.",
    spotify:
      "https://open.spotify.com/track/3lF3qddTZBluxN5OnYWBYU",
  },
  {
    title: "Saving All My Love",
    artist: "Empara Mi",
    year: "2020",
    note: "It takes me back in time when the world felt simpler.",
    spotify:
      "https://open.spotify.com/track/2XuTDuzJVQxMwtQ8ec7UsM?si=74c54f16b80a4a83",
  },
  {
    title: "Pretty Please",
    artist: "Dutch Melrose, benny mayne",
    year: "2024",
    note: "Pleading for the pleasure you receive willingly.",
    spotify:
      "https://open.spotify.com/track/6kOdk29M8h6ZfHz4byVG0t?si=333e7fe24fd448b8",
  }, {
    title: "Speak in tongues",
    artist: "machineheart",
    year: "2024",
    note: "Together we speak in tongues, speaking the language of the heart.",
    spotify: "https://open.spotify.com/track/7vWbw3fF1WmPTYWREfV0fG?si=718aa3bd568e4864"
  }
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
