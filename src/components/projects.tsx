import { entriesOfKind, formatYears } from "../content/entries";
import Container from "./container";
import PageIntro from "./page-intro";
import Timeline from "./timeline";

export default function Projects() {
  const projects = entriesOfKind("project").map((entry) => ({
    id: entry.title,
    when: formatYears(entry),
    title: entry.title,
    detail: entry.detail,
    href: entry.href,
  }));

  return (
    <Container>
      <PageIntro title="Projects">Things I’ve built, and what I learned building them.</PageIntro>
      <section className="mt-16">
        {projects.length > 0 ? (
          <Timeline items={projects} />
        ) : (
          <p className="text-dust">No projects are written up yet. The first ones will appear here.</p>
        )}
      </section>
    </Container>
  );
}
