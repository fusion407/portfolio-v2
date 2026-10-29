"use client";

import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const NetworkScene = lazy(() => import("./network-scene"));
const query =
  "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function HeroNetwork({ children }: { children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const [eligible, setEligible] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const fail = useCallback(() => setFailed(true), []);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!window.matchMedia || !window.IntersectionObserver) return;
    const media = window.matchMedia(query);
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & { saveData?: boolean };
      }
    ).connection;
    const update = () =>
      setEligible(
        media.matches &&
          !connection?.saveData &&
          (navigator.hardwareConcurrency || 4) > 2,
      );
    const visibility = () => setVisible(document.visibilityState === "visible");
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.05 },
    );
    if (host.current) observer.observe(host.current);
    media.addEventListener("change", update);
    connection?.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    update();
    visibility();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
      connection?.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    if (!eligible || !inView || !visible || failed || loaded) return;
    // Wait until the initial content has painted before requesting the scene chunk.
    const timer = window.setTimeout(() => setLoaded(true), 1500);
    return () => window.clearTimeout(timer);
  }, [eligible, inView, visible, failed, loaded]);

  const mounted = loaded && eligible && !failed;
  const active = mounted && inView && visible && !paused;
  const showScene = mounted && ready;
  return (
    <div
      ref={host}
      className="hero-network"
      data-scene={
        failed
          ? "fallback"
          : showScene
            ? active
              ? "active"
              : "paused"
            : mounted
              ? "loading"
              : "static"
      }
    >
      {children}
      {mounted && (
        <div className="hero-network-canvas" aria-hidden="true">
          <SceneBoundary onFailure={fail}>
            <Suspense fallback={null}>
              <NetworkScene
                active={active}
                onReady={onReady}
                onFailure={fail}
              />
            </Suspense>
          </SceneBoundary>
        </div>
      )}
      {showScene && (
        <button
          className="network-motion-control"
          type="button"
          onClick={() => setPaused(!paused)}
        >
          {paused ? "Resume animation" : "Pause animation"}
        </button>
      )}
    </div>
  );
}
