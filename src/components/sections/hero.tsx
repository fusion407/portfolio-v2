import { HeroArcade } from "@/components/arcade/hero-arcade";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <Container>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{site.identity}</p>
            <h1 id="hero-heading" className="hero-heading">
              I build
              <br />
              <span>things.</span>
            </h1>
            <p className="hero-description">{site.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore my work <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href="#process">
                How I build <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <HeroArcade />
        </div>
        <div className="hero-footnote">
          <p>
            AI engineering<span> / </span>Creative software<span> / </span>
            Real-time worlds
          </p>
          <a href="#work">
            Scroll to explore <span aria-hidden="true">↓</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
