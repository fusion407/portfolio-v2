import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ProfileLink } from "@/components/ui/profile-link";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <div className="foundation-shell">
      <header className="site-header">
        <Container className="flex items-center justify-between gap-6">
          <Link className="wordmark" href="/">
            <span className="brand-mark" aria-hidden="true">
              bd<span>.</span>
            </span>
            <span>{site.name}</span>
          </Link>
          <span className="edition-label">Portfolio / 02</span>
        </Container>
      </header>

      <main id="main-content" tabIndex={-1} className="foundation-main">
        <Container>
          <p className="eyebrow">{site.identity}</p>
          <h1 className="hero-heading">
            I build
            <br />
            <span>things.</span>
          </h1>
          <p className="hero-description">{site.description}</p>
          <nav aria-label="Professional profiles" className="profile-links">
            <ProfileLink href={site.profiles.github}>GitHub</ProfileLink>
            <ProfileLink href={site.profiles.linkedin}>LinkedIn</ProfileLink>
          </nav>
        </Container>
      </main>

      <footer className="site-footer">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p>Ideas. Systems. Working software.</p>
          <p className="progress-label">
            <span aria-hidden="true" />A new portfolio is taking shape.
          </p>
        </Container>
      </footer>
    </div>
  );
}
