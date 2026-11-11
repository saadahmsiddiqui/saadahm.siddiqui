import { Link } from "react-router";
import { explore } from "../content/explore";

export default function Explore() {
  return (
    <section className="mt-8" aria-labelledby="explore-heading">
      <h2 id="explore-heading" className="mb-8 text-sm text-dust">
        Explore
      </h2>
      {/* gap-px over a border-coloured background draws hairlines between cells */}
      <ul className="grid gap-px overflow-hidden rounded-md border border-deep bg-deep sm:grid-cols-2">
        {explore.map((item) => (
          <li key={item.to} className="bg-ink">
            <Link
              to={item.to}
              className="group block h-full p-6 transition-colors hover:bg-[var(--slate-2)] focus-visible:-outline-offset-2 sm:p-8"
            >
              <span className="block text-xl text-paper transition-colors group-hover:text-lamp">
                {item.title}
              </span>
              <span className="mt-2 block leading-relaxed text-dust">{item.body}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
