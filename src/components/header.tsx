import { Link, NavLink } from "react-router";
import { site } from "../content/site";
import { nav } from "../content/nav";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-6 text-sm">
      <Link to="/" className="flex items-center gap-3 text-paper">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-deep text-sm font-light text-dust"
        >
          S
        </span>
        <span className="hidden sm:inline">{site.name}</span>
      </Link>

      <nav aria-label="Main">
        <ul className="flex gap-6">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end
                className={({ isActive }) =>
                  `underline-offset-[6px] transition-colors hover:text-lamp ${
                    isActive ? "text-paper underline decoration-deep" : "text-dust"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
