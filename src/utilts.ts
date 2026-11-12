export function formatTimestamp(unixTimestamp: number): string {
  return new Date(unixTimestamp * 1000).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})
}

export function formatWorkingExperienceTimeData(data: {
  month: number;
  year: number;
}): string {

  const monthNames: Record<number, string> = {
    1:"Jan",
    2:"Feb",
    3:"Mar",
    4:"Apr",
    5:"May",
    6:"Jun",
    7:"Jul",
    8:"Aug",
    9:"Sep",
    10:"Oct",
    11:"Nov",
    12: "Dec"
  }

  const { month, year } = data;
  const workingDate = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
  return monthNames[workingDate.getMonth() + 1] + " " + workingDate.getFullYear()
}

const SPOTIFY_LINK = /open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|album|playlist|artist|episode|show)\/([A-Za-z0-9]+)/;

/** Turns a Spotify share link into a URI like `spotify:track:<id>`, or null if it isn't one. */
export function spotifyUri(link?: string): string | null {
  const match = link?.match(SPOTIFY_LINK);
  if (!match) return null;
  const [, type, id] = match;
  return `spotify:${type}:${id}`;
}
