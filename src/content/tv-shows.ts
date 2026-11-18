// TV shows on the Media page. `endYear` is left out for shows still running.
// `cover` is a poster image (2:3): a file name in src/assets/tv/ (e.g.
// "friends.jpg") or a full URL. Missing covers fall back to the title.
export type TvShow = {
  name: string;
  startYear: number;
  endYear?: number;
  creator: string;
  description?: string;
  imdbLink?: string;
  cover?: string;
};

export const TV_SHOWS: TvShow[] = [
  {
    name: "Friends",
    startYear: 1994,
    endYear: 2004,
    creator: "David Crane & Marta Kauffman",
    description:
      "Six friends navigate work, love and each other in Manhattan, mostly from the couch at Central Perk.",
    imdbLink: "https://www.imdb.com/title/tt0108778/",
    cover: "friends.jpg",
  },
  {
    name: "BoJack Horseman",
    startYear: 2014,
    endYear: 2020,
    creator: "Raphael Bob-Waksberg",
    description:
      "A washed-up '90s sitcom horse tries to find meaning in Hollywood, and keeps getting in his own way.",
    imdbLink: "https://www.imdb.com/title/tt3398228/",
    cover: "bojack.jpg",
  },
  {
    name: "Pluribus",
    startYear: 2025,
    creator: "Vince Gilligan",
    description:
      "One of the few people immune to a wave of forced happiness sweeping the planet sets out to save humanity from its own bliss.",
    imdbLink: "https://www.imdb.com/title/tt22202452/",
    cover: "pluribus.jpg",
  },
  {
    name: "3 Body Problem",
    startYear: 2024,
    creator: "David Benioff, D. B. Weiss & Alexander Woo",
    description:
      "A fateful decision made in 1960s China echoes into the present, as a group of scientists and a detective face a threat to humanity.",
    imdbLink: "https://www.imdb.com/title/tt13016388/",
    cover: "3body.jpg",
  },
  {
    name: "Game of Thrones",
    startYear: 2011,
    endYear: 2019,
    creator: "David Benioff & D. B. Weiss",
    description:
      "Noble families scheme and wage war for the Iron Throne of Westeros, while an ancient threat gathers beyond the Wall.",
    imdbLink: "https://www.imdb.com/title/tt0944947/",
    cover: "got.jpg",
  },
];

const covers = import.meta.glob<string>(
  "../assets/tv/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" },
);

/** Image URL for a show's `cover`, or undefined if the file isn't in src/assets/tv/. */
export function coverSrc(cover?: string) {
  if (!cover) return undefined;
  if (/^https?:\/\//.test(cover)) return cover;
  return covers[`../assets/tv/${cover}`];
}
