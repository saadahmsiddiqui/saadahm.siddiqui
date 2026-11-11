import { photos } from "../content/photos";
import Container from "./container";
import PageIntro from "./page-intro";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function Photography() {
  return (
    <Container>
      <PageIntro title="Photography">
        Photos from the cities I’ve lived in and travelled through.
      </PageIntro>
      <section className="mt-16">
        {photos.length > 0 ? (
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {photos.map((photo) => (
              <li key={photo.file}>
                <figure className="group h-full rounded-sm border border-deep bg-[var(--slate-2)] p-2 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.6)] transition-colors duration-300 hover:border-[var(--amber-7)]">
                  <img
                    src={photo.src}
                    alt={photo.alt ?? photo.place ?? "Photograph"}
                    loading="lazy"
                    className="aspect-[9/16] w-full rounded-[1px] object-cover outline outline-1 -outline-offset-1 outline-white/5"
                  />
                  {(photo.title || photo.story || photo.place || photo.year) && (
                    <figcaption className="mt-3 px-1 pb-1">
                      {photo.title && (
                        <h3 className="text-sm font-semibold text-paper">{photo.title}</h3>
                      )}
                      {(photo.place || photo.year) && (
                        <p className="mt-0.5 text-xs text-dust">
                          {[photo.place, photo.year].filter(Boolean).join(", ")}
                        </p>
                      )}
                      {photo.date && (
                        <time dateTime={photo.date} className="mt-0.5 block text-xs text-dust">
                          {formatDate(photo.date)}
                        </time>
                      )}
                      {photo.story && (
                        <p className="mt-2 text-xs leading-relaxed text-dust">{photo.story}</p>
                      )}
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-dust">No photos are up yet. They will appear here.</p>
        )}
      </section>
    </Container>
  );
}
