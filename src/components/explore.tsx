import { useState, type KeyboardEvent } from "react";
import { Link } from "react-router";
import { explore } from "../content/explore";
import ExplorePreview from "./explore-preview";

/** Arrow keys, Home and End move between the links; focusing one selects it. */
function moveFocus(event: KeyboardEvent<HTMLUListElement>) {
  const links = [...event.currentTarget.querySelectorAll<HTMLAnchorElement>("a")];
  const current = links.indexOf(document.activeElement as HTMLAnchorElement);
  if (current === -1) return;

  const last = links.length - 1;
  const next = {
    ArrowDown: current === last ? 0 : current + 1,
    ArrowUp: current === 0 ? last : current - 1,
    Home: 0,
    End: last,
  }[event.key];
  if (next === undefined) return;

  event.preventDefault();
  links[next].focus();
}

/**
 * Pages to visit, each with a preview. With a pointer on a wide screen the
 * previews share one panel and the hovered or focused page fills it;
 * otherwise each preview sits under its own link.
 */
export default function Explore() {
  const [active, setActive] = useState<string>(explore[0].to);

  return (
    <section className="mt-8" aria-labelledby="explore-heading">
      <h2 id="explore-heading" className="mb-8 text-sm text-dust">
        Explore
      </h2>
      <ul
        onKeyDown={moveFocus}
        className="overflow-hidden rounded-md border border-deep stage:relative stage:flex stage:min-h-[32rem] stage:flex-col stage:bg-[var(--slate-2)]"
      >
        {explore.map(({ icon: Icon, ...item }) => {
          const selected = item.to === active;
          return (
            <li
              key={item.to}
              // The selected row drops its own background and divider to join the panel.
              className={`border-deep not-last:border-b stage:flex stage:w-[42%] stage:flex-1 stage:border-r ${
                selected ? "stage:border-r-transparent" : "stage:bg-ink"
              }`}
            >
              {/* Not positioned, so the preview can fill the panel and stay clickable. */}
              <Link
                to={item.to}
                data-active={selected}
                onMouseEnter={() => setActive(item.to)}
                onFocus={() => setActive(item.to)}
                className="group block w-full focus-visible:-outline-offset-2 stage:flex stage:items-center"
              >
                <span className="flex gap-4 p-6 stage:py-4">
                  <Icon
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-dust transition-colors stage:group-data-[active=true]:text-lamp"
                  />
                  <span>
                    <span className="block text-xl text-paper transition-colors stage:group-data-[active=true]:text-lamp">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-dust">
                      {item.body}
                    </span>
                  </span>
                </span>
                <div
                  aria-hidden="true"
                  className="flex items-center px-6 pb-6 [--open:1] stage:pointer-events-none stage:absolute stage:inset-y-0 stage:right-0 stage:w-[58%] stage:p-10 stage:opacity-0 stage:transition-opacity stage:duration-300 stage:[--open:0] stage:group-data-[active=true]:pointer-events-auto stage:group-data-[active=true]:opacity-100 stage:group-data-[active=true]:[--open:1] motion-reduce:transition-none"
                >
                  <ExplorePreview to={item.to} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
