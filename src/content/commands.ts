import { navigation } from "./navigation";
import { projects, projectHref } from "./projects";
import { site } from "./site";
import { professional } from "./professional";

export type PortfolioCommand = {
  id: string;
  label: string;
  href: string;
  group: "Navigate" | "Projects" | "Connect";
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
    id: "email",
    label: "Email Brady",
    href: `mailto:${professional.publicEmail}`,
    group: "Connect",
    hint: professional.publicEmail,
    keywords: ["email", "contact", professional.publicEmail],
  },
  {
    id: "github",
    label: "GitHub",
    href: site.profiles.github,
    group: "Connect",
    hint: "fusion407 · github.com",
    keywords: ["GitHub", "fusion407"],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: site.profiles.linkedin,
    group: "Connect",
    hint: "Professional profile · linkedin.com",
    keywords: ["LinkedIn"],
  },
];

// Résumé actions are deferred until Brady supplies an updated document.

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
