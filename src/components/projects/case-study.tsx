import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getNextProject, projectHref, type Project } from "@/content/projects";
import { ProjectArtwork } from "./project-artwork";

export function CaseStudy({ project }: { project: Project }) {
  const next = getNextProject(project.slug);
  const contents = [
    { id: "overview", title: "Overview" },
    ...(project.migration
      ? [{ id: "migration", title: "Cloud to local" }]
      : []),
    ...project.sections.map(({ id, title }) => ({ id, title })),
    ...(project.trailer ? [{ id: "trailer", title: "Official trailer" }] : []),
  ];

  return (
    <Container className={`case-page case-${project.id}`}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/projects">Projects</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{project.title}</span>
      </nav>
      <header className="case-intro">
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        <div className="case-summary-grid">
          <p className="case-lead">{project.summary}</p>
          <dl className="case-facts">
            {project.id !== "neonsynth" && (
              <div>
                <dt>Status</dt>
                <dd>
                  <span className="status-badge">{project.status}</span>
                </dd>
              </div>
            )}
            <div>
              <dt>Role / context</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Technology & focus</dt>
              <dd>{project.tools.join(" / ")}</dd>
            </div>
          </dl>
        </div>
      </header>
      <div
        className="case-cover"
        id={project.trailer ? "trailer" : undefined}
        tabIndex={project.trailer ? -1 : undefined}
      >
        <ProjectArtwork kind={project.id} />
      </div>
      <div className="case-body">
        <aside className="case-sidebar">
          <nav aria-label="In this project">
            <p className="eyebrow">In this project</p>
            {contents.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.title}
              </a>
            ))}
          </nav>
        </aside>
        <div className="case-story">
          <section
            id="overview"
            className="case-section"
            aria-labelledby="overview-heading"
            tabIndex={-1}
          >
            <h2 id="overview-heading">Project overview</h2>
            {project.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          {project.migration && (
            <section
              id="migration"
              className="case-section"
              aria-labelledby="migration-heading"
              tabIndex={-1}
            >
              <h2 id="migration-heading">From cloud to local.</h2>
              <p>
                A high-level comparison of the starting point and the intended
                destination. The migration is ongoing.
              </p>
              <div className="migration-comparison">
                <article>
                  <p className="eyebrow">Starting point</p>
                  <h3>{project.migration.startingPoint.title}</h3>
                  <ul>
                    {project.migration.startingPoint.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article>
                  <p className="eyebrow">In development / target</p>
                  <h3>{project.migration.target.title}</h3>
                  <ul>
                    {project.migration.target.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>
          )}
          {project.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="case-section"
              aria-labelledby={`${section.id}-heading`}
              tabIndex={-1}
            >
              <h2 id={`${section.id}-heading`}>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items && (
                <ul className="contribution-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
      <nav className="project-pagination" aria-label="Project navigation">
        <Link href="/projects" className="case-study-link">
          <span aria-hidden="true">←</span>All projects
        </Link>
        {next && (
          <Link className="next-project" href={projectHref(next)}>
            <span className="eyebrow">
              Next project <span aria-hidden="true">↗</span>
            </span>
            <span>{next.title}</span>
          </Link>
        )}
      </nav>
    </Container>
  );
}
