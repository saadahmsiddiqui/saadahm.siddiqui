import { useEffect, useState } from "react";
import { spotifyUri } from "../utilts";

// Spotify's public oEmbed endpoint: no key needed, CORS-enabled, returns a 300×300 cover.
const cache = new Map<string, Promise<string | null>>();

function fetchCover(link: string): Promise<string | null> {
  let pending = cache.get(link);
  if (!pending) {
    pending = fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(link)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { thumbnail_url?: string } | null) => data?.thumbnail_url ?? null)
      .catch(() => {
        cache.delete(link);
        return null;
      });
    cache.set(link, pending);
  }
  return pending;
}

/** Cover art URL for a Spotify link. `override` (e.g. a local image) wins if given. */
export function useSpotifyCover(link?: string, override?: string): string | null {
  const [fetched, setFetched] = useState<{ link: string; url: string | null } | null>(null);
  const valid = !override && link && spotifyUri(link) ? link : null;

  useEffect(() => {
    if (!valid) return;
    let cancelled = false;
    fetchCover(valid).then((url) => {
      if (!cancelled) setFetched({ link: valid, url });
    });
    return () => {
      cancelled = true;
    };
  }, [valid]);

  if (override) return override;
  return fetched && fetched.link === valid ? fetched.url : null;
}
