import type { IconType } from "react-icons";
import { FaSteam, FaXbox } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import gamesData from "./games.json";

// Platform IDs shown on the gaming page. `href` is optional; omit it to show the ID without a link.
export const gamerIds: { platform: string; id: string; icon: IconType; href?: string }[] = [
  {
    platform: "Xbox",
    id: "Vealrye",
    icon: FaXbox,
    href: "https://account.xbox.com/en-us/profile?gamertag=Vealrye",
  },
  {
    platform: "Steam",
    id: "vealryesaturn",
    icon: FaSteam,
    href: "https://steamcommunity.com/id/vealryesaturn",
  },
  {
    platform: "Epic Games",
    id: "saad_jhk",
    icon: SiEpicgames,
  },
  // {
  //   platform: "PlayStation",
  //   id: "YourPSNid",
  //   icon: FaPlaystation,
  // },
];

// Games shown as tiles on the gaming page, sorted by release year. The list
// itself lives in games.json. `id` is a random UUID and must be unique.
// `cover` is box art (2:3): a file name in src/assets/games/ (e.g.
// "vice-city.jpg") or a full URL. Missing covers fall back to the title.
// `loved` games also appear in the "Games I absolutely loved" section.
export type Game = {
  id: string;
  name: string;
  year: number;
  developer: string;
  description?: string;
  link?: string;
  cover?: string;
  loved?: boolean;
};

export const GAMES: Game[] = gamesData;

const covers = import.meta.glob<string>(
  "../assets/games/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" },
);

/** Image URL for a game's `cover`, or undefined if the file isn't in src/assets/games/. */
export function gameCoverSrc(cover?: string) {
  if (!cover) return undefined;
  if (/^https?:\/\//.test(cover)) return cover;
  return covers[`../assets/games/${cover}`];
}
