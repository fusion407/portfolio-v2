"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  advanceAsteroids,
  createAsteroids,
  SPACE,
  type AsteroidsInput,
} from "./asteroids-engine";
import type { GameProps } from "./game-registry";

const emptyInput = (): AsteroidsInput => ({
  turn: 0,
  thrust: false,
  fire: false,
});
const controls = [
  { key: "arrowleft", label: "Rotate left", icon: "↶" },
  { key: "arrowup", label: "Thrust", icon: "↑" },
  { key: "arrowright", label: "Rotate right", icon: "↷" },
  { key: " ", label: "Fire", icon: "◎" },
] as const;

export function Asteroids({ onExit }: GameProps) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const resume = useRef<HTMLButtonElement>(null);
  const state = useRef<ReturnType<typeof createAsteroids> | null>(null);
  const keys = useRef(new Set<string>());
  const input = useRef(emptyInput());
  const queuedShot = useRef(false);
  const [paused, setPaused] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [hud, setHud] = useState({ score: 0, lives: 3, wave: 1 });
  const pause = useCallback(() => {
    setPaused(true);
    keys.current.clear();
    input.current = emptyInput();
    queuedShot.current = false;
  }, []);

  useEffect(() => {
    state.current = createAsteroids();
    canvas.current?.focus({ preventScroll: true });
    canvas.current?.scrollIntoView({ block: "nearest", behavior: "auto" });
    const visibility = () => {
      if (document.visibilityState !== "visible") pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && !entry.isIntersecting) pause();
      },
      { threshold: 0.1 },
    );
    if (host.current) observer.observe(host.current);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("blur", pause);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("blur", pause);
    };
  }, [pause]);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) {
      setUnavailable(true);
      return;
    }
    let frame = 0;
    let last = 0;
    function draw() {
      if (!element || !context || !state.current) return;
      const game = state.current;
      const width = Math.round(
        element.clientWidth * Math.min(window.devicePixelRatio || 1, 2),
      );
      if (width && element.width !== width) {
        element.width = width;
        element.height = Math.round((width * SPACE.height) / SPACE.width);
      }
      context.setTransform(
        element.width / 800,
        0,
        0,
        element.height / 480,
        0,
        0,
      );
      context.fillStyle = "#080b14";
      context.fillRect(0, 0, 800, 480);
      context.fillStyle = "#495775";
      for (let index = 0; index < 55; index++)
        context.fillRect(
          (index * 137 + 31) % 800,
          (index * 83 + 17) % 480,
          1.5,
          1.5,
        );
      context.lineWidth = 2;
      context.strokeStyle = "#947cff";
      for (const rock of game.rocks) {
        // Draw wrapped copies so objects cross each boundary continuously.
        for (const dx of [-800, 0, 800])
          for (const dy of [-480, 0, 480]) {
            if (
              rock.x + dx < -rock.size ||
              rock.x + dx > 800 + rock.size ||
              rock.y + dy < -rock.size ||
              rock.y + dy > 480 + rock.size
            )
              continue;
            context.beginPath();
            for (let point = 0; point <= 10; point++) {
              const angle = (point * Math.PI) / 5 + rock.angle;
              const radius = rock.size * (point % 2 ? 0.77 : 1);
              const x = rock.x + dx + Math.cos(angle) * radius;
              const y = rock.y + dy + Math.sin(angle) * radius;
              if (!point) context.moveTo(x, y);
              else context.lineTo(x, y);
            }
            context.closePath();
            context.stroke();
          }
      }
      context.fillStyle = "#f1f5ff";
      for (const shot of game.shots) {
        context.beginPath();
        context.arc(shot.x, shot.y, 2.5, 0, Math.PI * 2);
        context.fill();
      }
      if (game.lives) {
        const ship = game.ship;
        context.save();
        context.translate(ship.x, ship.y);
        context.rotate(ship.angle);
        if (game.shield > 0) {
          context.strokeStyle = "#495775";
          context.beginPath();
          context.arc(0, 0, 24, 0, Math.PI * 2);
          context.stroke();
        }
        context.strokeStyle = "#38bdf8";
        context.beginPath();
        context.moveTo(17, 0);
        context.lineTo(-12, -11);
        context.lineTo(-7, 0);
        context.lineTo(-12, 11);
        context.closePath();
        context.stroke();
        if (input.current.thrust && !paused) {
          context.strokeStyle = "#947cff";
          context.beginPath();
          context.moveTo(-12, -5);
          context.lineTo(-23, 0);
          context.lineTo(-12, 5);
          context.stroke();
        }
        context.restore();
      }
      if (paused || !game.lives || !game.rocks.length) {
        context.fillStyle = "#f1f5ff";
        context.font = "20px monospace";
        context.textAlign = "center";
        context.fillText(
          !game.lives ? "GAME OVER" : paused ? "PAUSED" : "FIELD CLEARED",
          400,
          110,
        );
      }
    }
    function tick(time: number) {
      const game = state.current;
      if (!game) return;
      const previous = `${game.score}/${game.lives}/${game.wave}`;
      if (last) {
        advanceAsteroids(game, (time - last) / 1000, {
          ...input.current,
          fire: input.current.fire || queuedShot.current,
        });
        queuedShot.current = false;
      }
      last = time;
      if (previous !== `${game.score}/${game.lives}/${game.wave}`)
        setHud({ score: game.score, lives: game.lives, wave: game.wave });
      draw();
      if (game.lives) frame = requestAnimationFrame(tick);
    }
    draw();
    const resize = new ResizeObserver(draw);
    resize.observe(element);
    if (!paused && hud.lives) frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  }, [paused, hud.lives]);

  function control(key: string, down: boolean) {
    if (key === " " && down && !paused) queuedShot.current = true;
    if (down) keys.current.add(key);
    else keys.current.delete(key);
    input.current = {
      turn:
        (keys.current.has("arrowright") || keys.current.has("d") ? 1 : 0) -
        (keys.current.has("arrowleft") || keys.current.has("a") ? 1 : 0),
      thrust: keys.current.has("arrowup") || keys.current.has("w"),
      fire: keys.current.has(" "),
    };
  }
  function continueGame() {
    input.current = emptyInput();
    keys.current.clear();
    queuedShot.current = false;
    setPaused(false);
    canvas.current?.focus({ preventScroll: true });
  }
  function restart() {
    state.current = createAsteroids();
    setHud({ score: 0, lives: 3, wave: 1 });
    continueGame();
  }
  function keyboard(event: React.KeyboardEvent, down: boolean) {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.nativeEvent.isComposing
    )
      return;
    const key = event.key.toLowerCase();
    if (
      ["arrowleft", "arrowright", "arrowup", "a", "d", "w", " "].includes(key)
    ) {
      event.preventDefault();
      control(key, down);
    } else if (down && !event.repeat && ["escape", "p"].includes(key)) {
      event.preventDefault();
      pause();
      resume.current?.focus({ preventScroll: true });
    }
  }
  return (
    <div
      ref={host}
      className="asteroids-game"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          pause();
      }}
    >
      <div className="asteroids-score" aria-label="Asteroids score">
        <span>
          Score <strong>{hud.score}</strong>
        </span>
        <span>
          Lives <strong>{hud.lives}</strong>
        </span>
        <span>
          Wave <strong>{hud.wave}</strong>
        </span>
      </div>
      {unavailable ? (
        <p className="arcade-error" role="alert">
          This browser couldn’t open the asteroid field. You can exit and
          explore the portfolio.
        </p>
      ) : (
        <canvas
          ref={canvas}
          width={800}
          height={480}
          tabIndex={0}
          role="application"
          aria-label="Asteroids field"
          aria-describedby="asteroids-instructions"
          onKeyDown={(event) => keyboard(event, true)}
          onKeyUp={(event) => keyboard(event, false)}
        >
          Asteroids is a visual space game. Controls and score are available
          below.
        </canvas>
      )}
      <p className="pong-instructions" id="asteroids-instructions">
        Rotate: ← / → or A / D. Thrust: ↑ or W. Fire: Space. Pause: Esc or P.
        Touch: hold the controls below. Tab leaves the field.
      </p>
      <div
        className="asteroids-touch"
        role="group"
        aria-label="Asteroids flight controls"
      >
        {controls.map(({ key, label, icon }) => (
          <button
            key={key}
            type="button"
            className="button button-secondary"
            aria-label={label}
            disabled={paused || !hud.lives || unavailable}
            onPointerDown={(event) => {
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              control(key, true);
            }}
            onPointerUp={() => control(key, false)}
            onPointerCancel={() => control(key, false)}
            onLostPointerCapture={() => control(key, false)}
            onKeyDown={(event) => {
              if ([" ", "Enter"].includes(event.key)) {
                event.preventDefault();
                control(key, true);
              }
            }}
            onKeyUp={(event) => {
              if ([" ", "Enter"].includes(event.key)) {
                event.preventDefault();
                control(key, false);
              }
            }}
            onBlur={() => control(key, false)}
          >
            <span aria-hidden="true">{icon}</span>
          </button>
        ))}
      </div>
      <div className="pong-controls">
        <button className="arcade-exit" type="button" onClick={onExit}>
          Exit game <span aria-hidden="true">×</span>
        </button>
        <button
          ref={resume}
          className="button button-secondary"
          type="button"
          disabled={!hud.lives || unavailable}
          onClick={paused ? continueGame : pause}
        >
          {paused ? "Resume Asteroids" : "Pause Asteroids"}
        </button>
        <button
          className="button button-secondary"
          type="button"
          disabled={unavailable}
          onClick={restart}
        >
          Restart Asteroids
        </button>
      </div>
      <p className="pong-status" role="status" aria-live="polite">
        {!hud.lives
          ? `Game over. Final score ${hud.score}. Play again?`
          : paused
            ? "Paused. Resume when you’re ready."
            : `Score ${hud.score}. ${hud.lives} lives. Wave ${hud.wave}.`}
      </p>
    </div>
  );
}
