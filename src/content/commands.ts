import { navigation } from "./navigation";
import { projects, projectHref } from "./projects";
import { site } from "./site";

export type PortfolioCommand = {
  id: string;
  label: string;
  href: string;
  group: "Navigate" | "Projects" | "Profiles";
  hint: string;
  keywords: string[];
};

export const commands: PortfolioCommand[] = [
  {
    id: "home",
    label: "Home",
    href: "/#top",
    group: "Navigate",
    hint: "Introduction",
    keywords: ["home", "top", "Brady"],
  },
  ...navigation.map((item) => ({
    id: `navigate-${item.label.toLowerCase()}`,
    label: item.label === "Projects" ? "All projects" : item.label,
    href: item.href,
    group: "Navigate" as const,
    hint: item.href.includes("#") ? "Homepage section" : "Project index",
    keywords: [item.label],
  })),
  ...projects.map((project) => ({
    id: `project-${project.id}`,
    label: project.title,
    href: projectHref(project),
    group: "Projects" as const,
    hint: project.status,
    keywords: [project.title],
  })),
  {
    id: "github",
    label: "GitHub",
    href: site.profiles.github,
    group: "Profiles",
    hint: "fusion407 · github.com",
    keywords: ["GitHub", "fusion407"],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: site.profiles.linkedin,
    group: "Profiles",
    hint: "Professional profile · linkedin.com",
    keywords: ["LinkedIn"],
  },
];

// Deliberately no resume/email commands until real destinations are supplied.

export function filterCommand(
  value: string,
  search: string,
  keywords: string[] = [],
) {
  const query = search.trim().toLowerCase();
  return [value, ...keywords].some((text) => text.toLowerCase().includes(query))
    ? 1
    : 0;
}
