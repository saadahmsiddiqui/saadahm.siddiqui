import { entriesOfKind, formatYears } from "../content/entries";
import Container from "./container";
import Timeline from "./timeline";

export default function WorkExperience() {
  const work = entriesOfKind("work").map((entry) => ({
    id: entry.title,
    when: formatYears(entry),
    title: entry.title,
    detail: entry.detail,
    description: entry.description,
    meta: entry.place && `${entry.place}${entry.remote ? " (remote)" : ""}`,
    href: entry.href,
  }));

  return (
    <Container>
      <section
        id="experience"
        className="mt-24 scroll-mt-10"
        aria-labelledby="work-heading"
      >
        <h2 id="work-heading" className="mb-8 text-sm text-dust">
          Where I’ve worked
        </h2>
        <Timeline items={work} />
      </section>
    </Container>
  );
}
