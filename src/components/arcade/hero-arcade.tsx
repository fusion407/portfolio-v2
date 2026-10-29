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
  const [picking, setPicking] = useState(false);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const restorePlay = useRef(false);
  async function chooseGame(index: number) {
    if (loading) return;
    setSelected(index);
    setFailed(false);
    setLoading(true);
    try {
      const component = await arcadeGames[index]!.load();
      setGame(() => component);
      setPicking(false);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }
  function exit() {
    restorePlay.current = true;
    setGame(null);
    setPicking(false);
    setFailed(false);
  }
  return (
    <div className="hero-arcade">
      <div className="arcade-heading">
        <p className="eyebrow">A little side quest</p>
        <span>
          {String(selected + 1).padStart(2, "0")} /{" "}
          {arcadeGames[selected]!.title.toUpperCase()}
        </span>
      </div>
      {Game ? (
        <Game onExit={exit} />
      ) : picking ? (
        <div
          className="arcade-picker"
          aria-busy={loading}
          onKeyDown={(event) => {
            if (event.key === "Escape" && !loading) {
              event.preventDefault();
              exit();
            }
          }}
        >
          <h2 className="eyebrow">Choose a game</h2>
          <div className="arcade-game-list">
            {arcadeGames.map((game, index) => (
              <button
                key={game.id}
                type="button"
                className="arcade-game-option"
                disabled={loading}
                onClick={() => void chooseGame(index)}
                ref={
                  index === 0
                    ? (element) => element?.focus({ preventScroll: true })
                    : undefined
                }
              >
                <svg viewBox="0 0 80 64" fill="none" aria-hidden="true">
                  {game.id === "pong" ? (
                    <>
                      <path
                        d="M12 16v28M68 24v28"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <circle cx="43" cy="28" r="3" fill="currentColor" />
                      <path
                        d="M40 4v56"
                        stroke="currentColor"
                        strokeDasharray="3 5"
                        opacity=".3"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        d="m30 16 12 30-12-6-12 6Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="m58 7 12 7-2 13-12 4-9-11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="m29 48 1 8M36 8l1-5" stroke="currentColor" />
                    </>
                  )}
                </svg>
                <span>{game.title}</span>
                <span className="sr-only"> — {game.description}</span>
              </button>
            ))}
          </div>
          <button
            className="arcade-exit"
            type="button"
            onClick={exit}
            disabled={loading}
          >
            Back <span aria-hidden="true">×</span>
          </button>
          {loading && (
            <p role="status" className="pong-instructions">
              Loading {arcadeGames[selected]!.title}…
            </p>
          )}
          {failed && (
            <p className="arcade-error" role="alert">
              The game couldn’t load.{" "}
              <button type="button" onClick={() => window.location.reload()}>
                Reload to try again
              </button>
              , or choose another game.
            </p>
          )}
        </div>
      ) : (
        <div className="arcade-preview">
          <svg viewBox="0 0 800 480" fill="none" aria-hidden="true">
            <path
              d="M400 24v432"
              stroke="#9DABCF"
              strokeOpacity=".16"
              strokeDasharray="8 14"
            />
            <rect x="30" y="150" width="12" height="88" rx="4" fill="#38BDF8" />
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
            <button
              type="button"
              className="button button-primary arcade-play"
              aria-label="Choose a game"
              disabled={!enhanced}
              ref={(element) => {
                if (element && restorePlay.current) {
                  restorePlay.current = false;
                  element.focus({ preventScroll: true });
                }
              }}
              onClick={() => setPicking(true)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 4.8a1 1 0 0 1 1.5-.86l11 7.2a1 1 0 0 1 0 1.72l-11 7.2A1 1 0 0 1 8 19.2Z" />
              </svg>
            </button>
            {!enhanced && (
              <p>
                Enable JavaScript to play. The portfolio is ready to explore
                below.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
