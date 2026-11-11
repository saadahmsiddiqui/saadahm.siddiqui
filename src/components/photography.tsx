import { photos } from "../content/photos";
import Container from "./container";
import PageIntro from "./page-intro";

export default function Photography() {
  return (
    <Container>
      <PageIntro title="Photography">
        Photos from the cities I’ve lived in and travelled through.
      </PageIntro>
      <section className="mt-16">
        {photos.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2">
            {photos.map((photo) => (
              <li key={photo.file}>
                <figure>
                  <img
                    src={`${import.meta.env.BASE_URL}photos/${photo.file}`}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full rounded-sm"
                  />
                  {(photo.place || photo.year) && (
                    <figcaption className="mt-2 text-sm text-dust">
                      {[photo.place, photo.year].filter(Boolean).join(", ")}
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
