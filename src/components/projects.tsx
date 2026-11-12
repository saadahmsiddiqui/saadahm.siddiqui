import { entriesOfKind, formatStarted, type Entry, type ProjectStatus } from "../content/entries";
import Container from "./container";
import PageIntro from "./page-intro";

const STATUS: Record<ProjectStatus, { label: string; text: string; dot: string }> = {
  live: { label: "Live", text: "text-live", dot: "bg-live" },
  development: { label: "Under development", text: "text-lamp", dot: "bg-lamp" },
  unmaintained: { label: "Not actively maintained", text: "text-dust", dot: "bg-dust" },
};

function ProjectCard({ project }: { project: Entry }) {
  const status = project.status ? STATUS[project.status] : undefined;

  return (
    <article className="flex flex-col rounded-lg border border-deep p-5 transition-colors hover:border-dust">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-bold text-paper">
          {project.href ? (
            <a href={project.href} className="hover:text-lamp">
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h2>
        <span className="shrink-0 pt-[0.25rem] text-sm text-dust tabular-nums">
          {formatStarted(project)}
        </span>
      </div>

      {status && (
        <p className={`mt-1 flex items-center gap-2 text-sm ${status.text}`}>
          <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </p>
      )}

      {project.description && (
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-dust">{project.description}</p>
      )}

      {project.github && (
        <p className="mt-4 text-sm">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="text-lamp hover:underline"
          >
            GitHub ↗
          </a>
        </p>
      )}
    </article>
  );
}

export default function Projects() {
  const projects = entriesOfKind("project");

  return (
    <Container>
      <PageIntro title="Projects">Things I’ve built, and what I learned building them.</PageIntro>
      <section className="mt-16">
        {projects.length > 0 ? (
          <div className="grid gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-dust">No projects are written up yet. The first ones will appear here.</p>
        )}
      </section>
    </Container>
  );
}
