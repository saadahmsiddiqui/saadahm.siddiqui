import { useCallback, useEffect, useRef, useState } from "react";
import { spotifyUri } from "../utilts";

// Spotify's iFrame API: https://developer.spotify.com/documentation/embeds/references/iframe-api
type PlaybackUpdate = { data: { isPaused: boolean; isBuffering: boolean } };

type Controller = {
  loadUri(uri: string): void;
  play(): void;
  pause(): void;
  togglePlay(): void;
  destroy(): void;
  addListener(event: "ready", cb: () => void): void;
  addListener(event: "playback_update", cb: (e: PlaybackUpdate) => void): void;
};

type IFrameAPI = {
  createController(
    element: HTMLElement,
    options: { uri: string; width?: string | number; height?: number },
    callback: (controller: Controller) => void,
  ): void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameAPI) => void;
  }
}

// The script can only be loaded once per page, so the promise lives at module level.
let apiPromise: Promise<IFrameAPI> | null = null;

function loadApi(): Promise<IFrameAPI> {
  apiPromise ??= new Promise((resolve, reject) => {
    window.onSpotifyIframeApiReady = resolve;
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    script.onerror = () => {
      apiPromise = null;
      script.remove();
      reject(new Error("Spotify player failed to load"));
    };
    document.body.appendChild(script);
  });
  return apiPromise;
}

/**
 * One shared Spotify player. Render a host element with `hostRef`; the
 * player's iframe is created inside it the first time something is played.
 */
export function useSpotifyPlayer() {
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<Controller | null>(null);
  const creatingRef = useRef(false);
  const latestUriRef = useRef<string | null>(null);

  const [current, setCurrent] = useState<{ uri: string; link: string } | null>(null);
  const [paused, setPaused] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(
    () => () => {
      controllerRef.current?.destroy();
      controllerRef.current = null;
    },
    [],
  );

  const play = useCallback(async (link: string) => {
    const uri = spotifyUri(link);
    if (!uri) return;

    setCurrent({ uri, link });
    setFailed(false);
    latestUriRef.current = uri;

    const controller = controllerRef.current;
    if (controller) {
      controller.loadUri(uri);
      controller.play();
      return;
    }
    // A second click while the player is still being created just changes what it will load.
    if (creatingRef.current) return;
    creatingRef.current = true;

    try {
      const api = await loadApi();
      const host = hostRef.current;
      if (!host) return;
      // The API replaces the element it is given, so hand it one React doesn't manage.
      const target = document.createElement("div");
      host.replaceChildren(target);

      api.createController(target, { uri, width: "100%", height: 80 }, (ctrl) => {
        controllerRef.current = ctrl;
        let first = true;
        ctrl.addListener("ready", () => {
          if (!first) return;
          first = false;
          if (latestUriRef.current && latestUriRef.current !== uri) {
            ctrl.loadUri(latestUriRef.current);
          }
          ctrl.play();
        });
        ctrl.addListener("playback_update", (e) => setPaused(e.data.isPaused));
      });
    } catch {
      setFailed(true);
    } finally {
      creatingRef.current = false;
    }
  }, []);

  const toggle = useCallback(() => controllerRef.current?.togglePlay(), []);

  const close = useCallback(() => {
    controllerRef.current?.pause();
    setCurrent(null);
  }, []);

  /** Whether `link` is the thing loaded in the player right now. */
  const isCurrent = useCallback(
    (link?: string) => current !== null && spotifyUri(link) === current.uri,
    [current],
  );

  return { hostRef, current, paused, failed, play, toggle, close, isCurrent };
}

export type SpotifyPlayer = ReturnType<typeof useSpotifyPlayer>;
