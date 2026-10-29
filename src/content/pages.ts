import { projects } from "./projects";
import { site } from "./site";
export type PortfolioPage = {
  slug: string;
  path: string;
  title: string;
  description: string;
  socialTitle: string;
  label: string;
};
export const portfolioPages: PortfolioPage[] = [
  {
    slug: "home",
    path: "/",
    title: `${site.name} — ${site.identity}`,
    description: site.description,
    socialTitle: site.headline,
    label: site.identity,
  },
  {
    slug: "projects",
    path: "/projects",
    title: `Projects — ${site.name}`,
    description:
      "Selected AI engineering, creative software, agentic tools, and technical-art projects by Brady Dorsey.",
    socialTitle: "Built with intent.",
    label: "Selected work / Four projects",
  },
  ...projects.map((project) => ({
    slug: project.slug,
    path: `/projects/${project.slug}`,
    title: `${project.title} — ${site.name}`,
    description: project.summary,
    socialTitle: project.title,
    label: `${project.category} / ${project.status}`,
  })),
];
export function getPortfolioPage(slug: string) {
  return portfolioPages.find((page) => page.slug === slug);
}
