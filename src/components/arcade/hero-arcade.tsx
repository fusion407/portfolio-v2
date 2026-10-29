"use client";

import {
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
} from "react";
import { arcadeGames, type GameProps } from "./game-registry";
const subscribe = () => () => {};

export function HeroArcade() {
  const enhanced = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [Game, setGame] = useState<ComponentType<GameProps> | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const play = useRef<HTMLButtonElement>(null);
  const chooseGame = async () => {
    setLoading(true);
    const game = arcadeGames[Math.floor(Math.random() * arcadeGames.length)]!;
    try {
      const component = await game.load();
      setGame(() => component);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };
  function exit() {
    setGame(null);
    requestAnimationFrame(() => play.current?.focus({ preventScroll: true }));
  }
  return (
    <div className="hero-arcade">
      {Game ? (
        <Game onExit={exit} />
      ) : (
        <>
          <div className="arcade-heading">
            <p className="eyebrow">A little side quest</p>
            <span>01 / PONG</span>
          </div>
          <div className="arcade-preview">
            <svg viewBox="0 0 800 480" fill="none" aria-hidden="true">
              <path
                d="M400 24v432"
                stroke="#9DABCF"
                strokeOpacity=".16"
                strokeDasharray="8 14"
              />
              <rect
                x="30"
                y="150"
                width="12"
                height="88"
                rx="4"
                fill="#38BDF8"
              />
              <rect
                x="758"
                y="242"
                width="12"
                height="88"
                rx="4"
                fill="#947CFF"
              />
              <circle cx="480" cy="190" r="7" fill="#F1F5FF" />
              <path d="m462 196-52 20" stroke="#38BDF8" strokeOpacity=".25" />
            </svg>
            <div className="arcade-invitation">
              <h2>Built to play.</h2>
              <p>A quick round of Pong. First to five.</p>
              <button
                ref={play}
                type="button"
                className="button button-primary"
                disabled={!enhanced || loading}
                onClick={() => void chooseGame()}
              >
                {loading ? "Loading Pong…" : "Play Pong"}
                <span aria-hidden="true">▷</span>
              </button>
              {!enhanced && (
                <p>
                  Enable JavaScript to play. The portfolio is ready to explore
                  below.
                </p>
              )}
            </div>
          </div>
          <p className="arcade-caption">
            A classic, rebuilt for a quick break.
          </p>
          {failed && (
            <p className="arcade-error" role="alert">
              The game couldn’t load.{" "}
              <button type="button" onClick={() => window.location.reload()}>
                Reload to try again
              </button>
              .
            </p>
          )}
        </>
      )}
    </div>
  );
}
