"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { advancePong, COURT, createPong, type PongInput } from "./pong-engine";
import type { GameProps } from "./game-registry";

export function Pong({ onExit }: GameProps) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const resume = useRef<HTMLButtonElement>(null);
  const state = useRef(createPong());
  const input = useRef<PongInput>({ direction: 0, target: null });
  const keys = useRef(new Set<string>());
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState({
    player: 0,
    computer: 0,
    winner: null as "You" | "Computer" | null,
  });
  const [unavailable, setUnavailable] = useState(false);
  const pause = useCallback(() => {
    setPaused(true);
    keys.current.clear();
    input.current.direction = 0;
    input.current.target = null;
  }, []);

  useEffect(() => {
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
      if (!context || !element) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(element.clientWidth * dpr);
      if (width && element.width !== width) {
        element.width = width;
        element.height = Math.round((width * COURT.height) / COURT.width);
      }
      context.setTransform(
        element.width / COURT.width,
        0,
        0,
        element.height / COURT.height,
        0,
        0,
      );
      context.fillStyle = "#080b14";
      context.fillRect(0, 0, 800, 480);
      context.strokeStyle = "#253048";
      context.lineWidth = 2;
      context.setLineDash([8, 14]);
      context.beginPath();
      context.moveTo(400, 20);
      context.lineTo(400, 460);
      context.stroke();
      context.setLineDash([]);
      context.fillStyle = "#38bdf8";
      context.fillRect(30, state.current.player - 44, 12, 88);
      context.fillStyle = "#947cff";
      context.fillRect(758, state.current.computer - 44, 12, 88);
      context.fillStyle = "#f1f5ff";
      context.beginPath();
      context.arc(state.current.x, state.current.y, 7, 0, Math.PI * 2);
      context.fill();
      if (paused || state.current.winner || state.current.serve > 0) {
        context.fillStyle = "#9dabcf";
        context.textAlign = "center";
        context.font = "18px monospace";
        context.fillText(
          state.current.winner
            ? "MATCH COMPLETE"
            : paused
              ? "PAUSED"
              : "GET READY",
          400,
          130,
        );
      }
    }
    function tick(time: number) {
      const previousPlayer = state.current.playerScore;
      const previousComputer = state.current.computerScore;
      if (last) advancePong(state.current, (time - last) / 1000, input.current);
      last = time;
      if (
        state.current.playerScore !== previousPlayer ||
        state.current.computerScore !== previousComputer
      )
        setScore({
          player: state.current.playerScore,
          computer: state.current.computerScore,
          winner: state.current.winner,
        });
      draw();
      if (!state.current.winner) frame = requestAnimationFrame(tick);
    }
    draw();
    const resize = new ResizeObserver(draw);
    resize.observe(element);
    if (!paused && !score.winner) frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  }, [paused, score.winner]);

  function restart() {
    state.current = createPong();
    input.current = { direction: 0, target: null };
    keys.current.clear();
    setScore({ player: 0, computer: 0, winner: null });
    setPaused(false);
    canvas.current?.focus({ preventScroll: true });
  }
  function continueGame() {
    setPaused(false);
    canvas.current?.focus({ preventScroll: true });
  }
  function key(event: React.KeyboardEvent<HTMLCanvasElement>, down: boolean) {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.nativeEvent.isComposing
    )
      return;
    const value = event.key.toLowerCase();
    if (["arrowup", "arrowdown", "w", "s"].includes(value)) {
      event.preventDefault();
      if (down) keys.current.add(value);
      else keys.current.delete(value);
      input.current.target = null;
      input.current.direction =
        (keys.current.has("arrowdown") || keys.current.has("s") ? 1 : 0) -
        (keys.current.has("arrowup") || keys.current.has("w") ? 1 : 0);
    } else if (down && !event.repeat && (value === " " || value === "escape")) {
      event.preventDefault();
      if (paused && value === " ") continueGame();
      else {
        pause();
        resume.current?.focus({ preventScroll: true });
      }
    }
  }
  function point(event: React.PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    input.current.target =
      ((event.clientY - rect.top) / rect.height) * COURT.height;
  }
  return (
    <div
      ref={host}
      className="pong-game"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          pause();
      }}
    >
      <div className="pong-score" aria-label="Pong score">
        <span>
          You <strong>{score.player}</strong>
        </span>
        <span>
          Computer <strong>{score.computer}</strong>
        </span>
      </div>
      {unavailable ? (
        <p role="alert">
          This browser couldn’t open the court. You can exit the game and
          explore the portfolio.
        </p>
      ) : (
        <canvas
          ref={canvas}
          width={800}
          height={480}
          tabIndex={0}
          role="application"
          aria-label="Pong court"
          aria-describedby="pong-instructions"
          onKeyDown={(event) => key(event, true)}
          onKeyUp={(event) => key(event, false)}
          onPointerDown={(event) => {
            event.currentTarget.focus({ preventScroll: true });
            event.currentTarget.setPointerCapture(event.pointerId);
            point(event);
          }}
          onPointerMove={point}
          onPointerCancel={() => {
            input.current.target = null;
          }}
        >
          Pong is a visual paddle game. Use the score and controls below to
          pause, restart, or exit.
        </canvas>
      )}
      <p id="pong-instructions" className="pong-instructions">
        Move: ↑ / ↓ or W / S. Mouse or touch: move or drag on the court. Space
        or Esc pauses. Tab leaves the court.
      </p>
      <div className="pong-controls">
        <button
          ref={resume}
          className="button button-secondary"
          type="button"
          disabled={!!score.winner || unavailable}
          onClick={paused ? continueGame : pause}
        >
          {paused ? "Resume Pong" : "Pause Pong"}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={restart}
          disabled={unavailable}
        >
          Restart Pong
        </button>
        <button className="arcade-exit" type="button" onClick={onExit}>
          Exit game <span aria-hidden="true">×</span>
        </button>
      </div>
      <p className="pong-status" role="status" aria-live="polite">
        {score.winner
          ? `${score.winner === "You" ? "You win" : "Computer wins"}! ${score.player} to ${score.computer}. Play again?`
          : paused
            ? "Paused. Resume when you’re ready."
            : `You ${score.player}, computer ${score.computer}. First to five wins.`}
      </p>
    </div>
  );
}
