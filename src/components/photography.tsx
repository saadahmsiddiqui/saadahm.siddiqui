import { useSearchParams } from "react-router";
import { photos } from "../content/photos";
import Container from "./container";
import PageIntro from "./page-intro";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const PAGE_SIZE = 6;

export default function Photography() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = Math.max(1, Math.ceil(photos.length / PAGE_SIZE));
  const requested = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isFinite(requested)
    ? Math.min(Math.max(requested, 1), pageCount)
    : 1;
  const visible = photos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goTo = (next: number) => {
    setSearchParams(next === 1 ? {} : { page: String(next) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <PageIntro title="Photography">
        Photos from the cities I’ve lived in and travelled through.
      </PageIntro>
      <section className="mt-16">
        {photos.length > 0 ? (
          <>
            <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {visible.map((photo) => (
                <li key={photo.file}>
                  <figure className="group h-full rounded-sm border border-deep bg-[var(--slate-2)] p-2 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.6)] transition-colors duration-300 hover:border-[var(--amber-7)]">
                    <img
                      src={photo.src}
                      alt={photo.alt ?? photo.place ?? "Photograph"}
                      loading="lazy"
                      className="aspect-[3/4] w-full rounded-[1px] object-cover outline outline-1 -outline-offset-1 outline-white/5"
                    />
                    {(photo.title ||
                      photo.story ||
                      photo.place ||
                      photo.year) && (
                      <figcaption className="mt-3 px-1 pb-1">
                        {photo.title && (
                          <h3 className="text-sm font-semibold text-paper">
                            {photo.title}
                          </h3>
                        )}
                        {(photo.place || photo.year) && (
                          <p className="mt-0.5 text-xs text-dust">
                            {[photo.place, photo.year]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        )}
                        {photo.date && (
                          <time
                            dateTime={photo.date}
                            className="mt-0.5 block text-xs text-dust"
                          >
                            {formatDate(photo.date)}
                          </time>
                        )}
                        {photo.story && (
                          <p className="mt-2 text-xs leading-relaxed text-dust">
                            {photo.story}
                          </p>
                        )}
                      </figcaption>
                    )}
                  </figure>
                </li>
              ))}
            </ul>
            {pageCount > 1 && (
              <nav
                aria-label="Photo pages"
                className="mt-12 flex items-center justify-center gap-6 text-sm text-dust"
              >
                <button
                  type="button"
                  onClick={() => goTo(page - 1)}
                  disabled={page === 1}
                  className="transition-colors hover:text-lamp disabled:pointer-events-none disabled:opacity-40"
                >
                  ← Previous
                </button>
                <ol className="flex items-center gap-3">
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                    (n) => (
                      <li key={n}>
                        <button
                          type="button"
                          onClick={() => goTo(n)}
                          aria-current={n === page ? "page" : undefined}
                          className={`tabular-nums transition-colors hover:text-lamp ${
                            n === page
                              ? "text-paper underline decoration-lamp underline-offset-[6px]"
                              : ""
                          }`}
                        >
                          {n}
                        </button>
                      </li>
                    ),
                  )}
                </ol>
                <button
                  type="button"
                  onClick={() => goTo(page + 1)}
                  disabled={page === pageCount}
                  className="transition-colors hover:text-lamp disabled:pointer-events-none disabled:opacity-40"
                >
                  Next →
                </button>
              </nav>
            )}
          </>
        ) : (
          <p className="text-dust">
            No photos are up yet. They will appear here.
          </p>
        )}
      </section>
    </Container>
  );
}
