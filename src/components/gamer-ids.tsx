import { useState } from "react";
import { gamerIds } from "../content/gaming";

/** Platform IDs (Xbox, Steam, PlayStation) as tiles with icon, copy button and optional profile link. */
export default function GamerIds() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (platform: string, id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(platform);
      setTimeout(() => setCopied((current) => (current === platform ? null : current)), 1500);
    } catch {
      // Clipboard unavailable (e.g. insecure context); the ID is still visible to select.
    }
  };

  return (
    <section className="mt-16">
      <p className="mb-4 font-sans text-sm text-dust">Find me on</p>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {gamerIds.map(({ platform, id, icon: Icon, href }) => (
          <li
            key={platform}
            className="flex flex-col rounded-lg border border-deep p-5 transition-colors hover:border-dust"
          >
            <Icon aria-hidden className="size-8 text-paper" />
            <p className="mt-5 font-sans text-sm text-dust">{platform}</p>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="mt-1 truncate text-paper underline decoration-deep underline-offset-4 transition-colors hover:text-lamp hover:decoration-lamp"
              >
                {id}
              </a>
            ) : (
              <p className="mt-1 truncate text-paper">{id}</p>
            )}
            <button
              type="button"
              onClick={() => copy(platform, id)}
              aria-label={`Copy ${platform} ID`}
              className="mt-4 self-start font-sans text-sm text-dust transition-colors hover:text-lamp"
            >
              {copied === platform ? "Copied" : "Copy ID"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
