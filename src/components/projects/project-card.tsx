import Link from "next/link";
import { projectHref, type ProjectSummary } from "@/content/projects";
import { ProjectArtwork } from "./project-artwork";

export function ProjectCard({
  project,
  index,
  headingLevel = 3,
}: {
  project: ProjectSummary;
  index: number;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="project-card" aria-labelledby={`${project.id}-title`}>
      <ProjectArtwork kind={project.id} />
      <div className="project-card-body">
        <div className="project-meta">
          <span>
            {String(index + 1).padStart(2, "0")} / {project.category}
          </span>
          {project.id !== "neonsynth" && (
            <span className="status-badge">{project.status}</span>
          )}
        </div>
        <Heading className="project-card-title" id={`${project.id}-title`}>
          {project.title}
        </Heading>
        <p className="project-summary">{project.summary}</p>
        <ul
          className="tag-list"
          aria-label={`${project.title} technologies and focus`}
        >
          {project.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
        <details className="project-overview">
          <summary>
            Project overview{" "}
            <span className="disclosure-symbol" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="overview-content">
            <p className="project-role">{project.role}</p>
            {project.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </details>
        <Link
          className="case-study-link"
          href={projectHref(project)}
          aria-label={`Explore project: ${project.title}`}
        >
          Explore project <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
