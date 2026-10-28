import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="not-found-page">
      <p className="eyebrow">404 / Unmapped territory</p>
      <div className="not-found-number" aria-hidden="true">
        404<span>.</span>
      </div>
      <h1>This path is still unbuilt.</h1>
      <p className="section-description">
        The page you’re looking for doesn’t exist. There are a few other things
        worth exploring.
      </p>
      <div className="hero-actions">
        <Link href="/" className="button button-primary">
          Back to home <span aria-hidden="true">↗</span>
        </Link>
        <Link href="/projects" className="button button-secondary">
          Explore projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Container>
  );
}
