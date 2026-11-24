import type { ReactNode } from "react";
import { cityPhotos, flags, formatTripDates, trips, type City, type Trip } from "../content/travel";
import Container from "./container";
import PageIntro from "./page-intro";

/** One row of the route: date, a marker on the rail, then the content. */
function Stop({
  when,
  marker,
  markerTop,
  start = false,
  end = false,
  children,
}: {
  when?: string;
  marker: string;
  /** Where the marker sits, lined up with the first line of text. */
  markerTop: string;
  /** The rail begins (or ends) at this row's marker. */
  start?: boolean;
  end?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[4.25rem_1.25rem_1fr] gap-x-3 sm:grid-cols-[5.5rem_2rem_1fr] sm:gap-x-4">
      <p className="pt-[0.5rem] text-sm text-dust tabular-nums">{when}</p>
      <span aria-hidden="true" className="flex flex-col items-center">
        <span className={`w-px shrink-0 ${markerTop} ${start ? "" : "bg-deep"}`} />
        <span className={`shrink-0 rounded-full ${marker}`} />
        {!end && <span className="w-px flex-1 bg-deep" />}
      </span>
      <div>{children}</div>
    </div>
  );
}

function CityDetails({ city }: { city: City }) {
  const pictures = cityPhotos(city);

  return (
    <div className="pb-8 sm:flex sm:items-start sm:justify-between sm:gap-8">
      <div>
        <h3 className="text-lg font-bold text-paper">{city.name}</h3>
        {city.note && (
          <p className="mt-1 max-w-[32rem] text-[0.9375rem] leading-relaxed text-dust">
            {city.note}
          </p>
        )}
      </div>
      {pictures.length > 0 && (
        <ul className="mt-4 flex shrink-0 flex-wrap gap-3 sm:mt-1">
          {pictures.map((photo) => (
            <li key={photo.file}>
              <img
                src={photo.thumb}
                alt={photo.alt ?? photo.title ?? `Photo from ${city.name}`}
                loading="lazy"
                className="aspect-[3/4] w-28 rounded-sm border border-deep object-cover sm:w-32"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Trips oldest first: countries are the stations, cities the stops after them. */
function Route({ trips }: { trips: Trip[] }) {
  return (
    <ol>
      {trips.map((trip, i) => {
        const lastTrip = i === trips.length - 1;

        return (
          <li key={`${trip.country} ${trip.from}`}>
            <Stop
              when={formatTripDates(trip)}
              start={i === 0}
              end={lastTrip && trip.cities.length === 0}
              markerTop="h-[0.8125rem]"
              marker={`h-2.5 w-2.5 border ${lastTrip ? "border-paper bg-paper" : "border-dust bg-ink"}`}
            >
              <h2 className="pb-4 text-[1.75rem] leading-9 font-light text-paper">
                <span aria-hidden="true" className="mr-2 text-[1.375rem]">
                  {flags[trip.country]}
                </span>
                {trip.country}
              </h2>
            </Stop>
            <ol>
              {trip.cities.map((city, j) => (
                <li key={city.name}>
                  <Stop
                    end={lastTrip && j === trip.cities.length - 1}
                    markerTop="h-[0.6875rem]"
                    marker="h-1.5 w-1.5 bg-dust"
                  >
                    <CityDetails city={city} />
                  </Stop>
                </li>
              ))}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}

export default function Travel() {
  return (
    <Container>
      <PageIntro title="Travel">Places I’ve visited and memories I’ve collected.</PageIntro>

      <section className="mt-16" aria-label="Trips">
        {trips.length > 0 ? (
          <Route trips={trips} />
        ) : (
          <p className="text-dust">No trips are up yet. They will appear here.</p>
        )}
      </section>
    </Container>
  );
}
