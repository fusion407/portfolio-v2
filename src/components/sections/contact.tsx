import { Container } from "@/components/ui/container";
import { ProfileLink } from "@/components/ui/profile-link";
import { site } from "@/content/site";

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
            Find me on GitHub or connect on LinkedIn.
          </p>
          <nav aria-label="Professional profiles" className="profile-links">
            <ProfileLink href={site.profiles.github}>GitHub</ProfileLink>
            <ProfileLink href={site.profiles.linkedin}>LinkedIn</ProfileLink>
          </nav>
          <p className="pending-contact">
            Public email: pending<span aria-hidden="true"> / </span>Résumé
            download: pending
          </p>
        </div>
      </Container>
    </section>
  );
}
