import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/content/projects";
import { getPortfolioPage } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(getPortfolioPage("projects")!);

export default function ProjectsPage() {
  return (
    <Container className="projects-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Projects</span>
      </nav>
      <header className="projects-intro">
        <p className="eyebrow">Selected work / 04 projects</p>
        <h1>
          Built with intent.
          <br />
          <span>Always evolving.</span>
        </h1>
        <p className="section-description">
          AI engineering, creative software, agentic tools, and technical art.
          Four projects with different stages, scopes, and stories.
        </p>
      </header>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            headingLevel={2}
          />
        ))}
      </div>
      <div className="index-contact">
        <p>Interested in how I approach the work?</p>
        <Link href="/#process" className="case-study-link">
          Explore my process <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </Container>
  );
}
