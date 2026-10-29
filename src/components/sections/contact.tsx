import { Container } from "@/components/ui/container";
import { ProfileLink } from "@/components/ui/profile-link";
import { site } from "@/content/site";
import { professional } from "@/content/professional";

export function Contact() {
  return (
    <section
      id="contact"
      className="page-section contact-section"
      aria-labelledby="contact-heading"
      tabIndex={-1}
    >
      <Container>
        <div className="contact-panel">
          <p className="eyebrow">
            <span className="section-number">06</span> / Start a conversation
          </p>
          <h2 id="contact-heading">
            Let’s build
            <br />
            <span>something.</span>
          </h2>
          <p className="section-description">
            Email me, find me on GitHub, or connect on LinkedIn.
          </p>
          <nav aria-label="Contact links" className="profile-links">
            <ProfileLink href={site.profiles.github}>GitHub</ProfileLink>
            <ProfileLink href={site.profiles.linkedin}>LinkedIn</ProfileLink>
            <a
              className="profile-link contact-email-link"
              href={`mailto:${professional.publicEmail}`}
            >
              <span className="contact-email-address">
                {professional.publicEmail}
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </Container>
    </section>
  );
}
