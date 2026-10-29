"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
} from "react";
import type { PaletteDialogProps } from "./palette-dialog";
import Link from "next/link";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function CommandPalette() {
  const enhanced = useSyncExternalStore(
    subscribe,
    clientSnapshot,
    serverSnapshot,
  );
  const [Dialog, setDialog] =
    useState<ComponentType<PaletteDialogProps> | null>(null);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const origin = useRef<HTMLElement | null>(null);
  const loading = useRef(false);
  const requestOpen = useCallback(
    (invoker?: HTMLElement) => {
      origin.current =
        invoker ??
        (document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null);
      setOpen(true);
      if (!Dialog && !loading.current && !failed) {
        loading.current = true;
        void import("./palette-dialog")
          .then((module) => setDialog(() => module.PaletteDialog))
          .catch(() => {
            setFailed(true);
            setOpen(false);
          })
          .finally(() => {
            loading.current = false;
          });
      }
    },
    [Dialog, failed],
  );

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (event.isComposing || event.repeat || event.altKey || event.shiftKey)
        return;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        if (failed) return;
        event.preventDefault();
        if (open) setOpen(false);
        else requestOpen();
      } else if (event.key === "Escape" && open && !Dialog) setOpen(false);
    };
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, [open, requestOpen, Dialog, failed]);

  return (
    <>
      {enhanced && !failed ? (
        <button
          className="command-trigger"
          type="button"
          aria-label="Search portfolio"
          title="Search portfolio (Ctrl+K / ⌘K)"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={(event) => requestOpen(event.currentTarget)}
        >
          <span aria-hidden="true">⌕</span>
          <span className="command-trigger-label">Search</span>
        </button>
      ) : (
        <Link
          className="command-trigger"
          href="/projects"
          prefetch={false}
          ref={(element) => {
            if (failed) element?.focus({ preventScroll: true });
          }}
        >
          Browse projects
        </Link>
      )}
      <span
        className="sr-only"
        role="status"
        aria-label="Portfolio search status"
      >
        {failed
          ? "Search is unavailable. Use Browse projects or the navigation links."
          : open && !Dialog
            ? "Opening portfolio search."
            : ""}
      </span>
      {Dialog && <Dialog open={open} onOpenChange={setOpen} origin={origin} />}
    </>
  );
}
