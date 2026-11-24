import { photos, type Photo } from "./photos";

/**
 * Trips for /travel. One entry per visit to a country, in any order; the page
 * sorts them oldest first. Trips in the same month keep the order they have
 * here. Visiting a country again is a new entry.
 */
export type City = {
  name: string;
  note?: string;
  /** File names in src/assets/gallery/, e.g. ["IMG_0023.jpg"]. */
  photos?: string[];
};

/** Add a country here before its first trip. */
export const flags = {
  Azerbaijan: "🇦🇿",
  Croatia: "🇭🇷",
  Czechia: "🇨🇿",
  Germany: "🇩🇪",
  Hungary: "🇭🇺",
  Morocco: "🇲🇦",
  Pakistan: "🇵🇰",
  Spain: "🇪🇸",
  Turkey: "🇹🇷",
  "United Arab Emirates": "🇦🇪",
};

export type Trip = {
  country: keyof typeof flags;
  /** "2026-05", or just "2026". */
  from: string;
  /** Same format. Only needed if the trip ended in a later month or year. */
  to?: string;
  /** In the order you visited them. */
  cities: City[];
};

const allTrips: Trip[] = [
  {
    country: "Czechia",
    from: "2026-08",
    cities: [{ name: "Prague" }],
  },
  {
    country: "Czechia",
    from: "2026-07",
    cities: [{ name: "Prague" }],
  },
  {
    country: "Croatia",
    from: "2026-07",
    cities: [{ name: "Zadar" }, { name: "Split" }],
  },
  {
    country: "Hungary",
    from: "2026-05",
    cities: [
      {
        name: "Budapest",
        note: "A church in the old town, with a Latin inscription above the entrance.",
      },
    ],
  },
  {
    country: "Spain",
    from: "2026-04",
    cities: [{ name: "Barcelona", note: "The beaches." }],
  },
  {
    country: "Turkey",
    from: "2026-03",
    cities: [{ name: "Istanbul", note: "The markets." }],
  },
  {
    country: "Pakistan",
    from: "2025-11",
    cities: [{ name: "Lahore" }],
  },
  {
    country: "Germany",
    from: "2025-04",
    cities: [{ name: "Düsseldorf" }],
  },
  {
    country: "Morocco",
    from: "2024-12",
    cities: [{ name: "Rabat" }, { name: "Marrakech", note: "The deserts." }],
  },
  {
    country: "Croatia",
    from: "2024-10",
    cities: [{ name: "Zagreb" }],
  },
  {
    country: "Czechia",
    from: "2024-07",
    cities: [{ name: "Prague" }],
  },
  {
    country: "Pakistan",
    from: "2024-01",
    cities: [{ name: "Islamabad" }, { name: "Lahore" }],
  },
  {
    country: "Azerbaijan",
    from: "2023-02",
    cities: [
      {
        name: "Baku",
        note: "No cash in our pockets, no shared language, and no idea where we were going.",
      },
    ],
  },
  {
    country: "United Arab Emirates",
    from: "2023-01",
    cities: [{ name: "Dubai" }],
  },
  {
    country: "Pakistan",
    from: "2022-02",
    cities: [{ name: "Islamabad" }],
  },
];

export const trips: Trip[] = [...allTrips].sort((a, b) => a.from.localeCompare(b.from));

/** "2026-05" becomes "May 2026"; "2026" stays as it is. */
function formatMonth(date: string): string {
  if (!date.includes("-")) return date;
  return new Date(`${date}-01T00:00:00`).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

export function formatTripDates({ from, to }: Trip): string {
  if (!to || to === from) return formatMonth(from);
  return `${formatMonth(from)} – ${formatMonth(to)}`;
}

export function cityPhotos(city: City): Photo[] {
  return photos.filter((photo) => city.photos?.includes(photo.file));
}
