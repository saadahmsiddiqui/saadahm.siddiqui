const details = {
  "IMG_1579.jpeg": {
    title: "Small Flames",
    story:
      "Rows of candles running down a dark wall, each one flickering a little out of step with the others. The room was almost black apart from them. They were the only thing to look at, and they were enough.",
    alt: "Pillar candles glowing warm yellow on dark wall shelves, receding into the distance",
    date: "2024-12-30",
  },
  "IMG_2351.jpeg": {
    title: "Coming Up for Air",
    story:
      "Leaving the station at Potsdamer Platz at dusk. You ride the escalator out of the ground and the city opens up above you through a lit glass grid: towers, the last blue of the sky, and the yellow lights coming on one by one.",
    alt: "Looking up through a glass roof lined with yellow lights at office towers at dusk, above a station entrance with escalators and a DB sign",
    place: "Potsdamer Platz, Berlin",
    date: "2025-04-27",
  },
  "IMG_2385.jpeg": {
    title: "Spring, All at Once",
    story:
      "Spring seemed to come overnight. A hedge I had walked past all winter without noticing was suddenly covered in small white flowers. I stopped, looked closer, and noticed each cluster was dozens of tiny blossoms.",
    alt: "Close-up of clusters of small white flowers with yellow centres on a leafy green shrub",
    date: "2025-05-10",
  },
  "IMG_2386.JPG": {
    title: "The Courtyard Balcony",
    story:
      "Two folding chairs, a wooden table, and a wall slowly disappearing under ivy. The courtyard is quiet in a way the street never is. It is where mornings start slowly and evenings end late, with laundry drying overhead.",
    alt: "A small balcony with folding chairs overlooking a courtyard, the building opposite covered in green and rust-coloured ivy",
    date: "2025-05-10",
  },
};
/**
 * Photos for /photography. Every image in src/assets/gallery/ is shown
 * automatically. Titles, stories and other details live in photos.json,
 * keyed by file name.
 */
export type PhotoDetails = {
  title?: string;
  story?: string;
  alt?: string;
  place?: string;
  year?: number;
  /** ISO date the photo was taken, e.g. "2025-04-27" */
  date?: string;
};

export const photoDetails: Record<string, PhotoDetails> = details;

export type Photo = PhotoDetails & { file: string; src: string };

const images = import.meta.glob<string>(
  "../assets/gallery/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" },
);

export const photos: Photo[] = Object.entries(images)
  .map(([path, src]) => {
    const file = path.split("/").pop()!;
    return { file, src, ...photoDetails[file] };
  })
  .sort(
    (a, b) =>
      new Date(a.date ?? "").getTime() - new Date(b.date ?? "").getTime(),
  );
