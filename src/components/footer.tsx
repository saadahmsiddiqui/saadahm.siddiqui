import { site } from "../content/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-deep pt-8 font-sans text-sm">
      <p className="mb-3 text-dust">Get in touch</p>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {site.links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-fog underline decoration-deep underline-offset-4 transition-colors hover:text-lamp hover:decoration-lamp"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
