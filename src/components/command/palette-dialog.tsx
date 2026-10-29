"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { useRef, type RefObject } from "react";
import { commands, filterCommand } from "@/content/commands";

export type PaletteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  origin: RefObject<HTMLElement | null>;
};

export function PaletteDialog({
  open,
  onOpenChange,
  origin,
}: PaletteDialogProps) {
  const input = useRef<HTMLInputElement>(null);
  const destination = useRef<string | null>(null);

  function changeOpen(value: boolean) {
    onOpenChange(value);
  }
  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="command-overlay" />
        <Dialog.Content
          className="command-dialog"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            input.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            const href = destination.current;
            destination.current = null;
            if (href) window.location.assign(href);
            else if (origin.current?.isConnected)
              origin.current.focus({ preventScroll: true });
            else
              document
                .getElementById("main-content")
                ?.focus({ preventScroll: true });
          }}
        >
          <div className="command-dialog-header">
            <Dialog.Title>Go somewhere.</Dialog.Title>
            <Dialog.Close className="command-close" aria-label="Close search">
              Close <span aria-hidden="true">×</span>
            </Dialog.Close>
          </div>
          <Dialog.Description className="command-description">
            Find a project, jump to a section, or open a professional profile.
          </Dialog.Description>
          <Command
            label="Search projects and pages"
            filter={filterCommand}
            loop
          >
            <Command.Input
              ref={input}
              placeholder="Search projects and pages…"
              aria-label="Search projects and pages"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <Command.List aria-label="Search results">
              <Command.Empty role="status">
                No results found. Try a project title or section name.
              </Command.Empty>
              {(["Navigate", "Projects", "Profiles"] as const).map((group) => (
                <Command.Group key={group} heading={group}>
                  {commands
                    .filter((command) => command.group === group)
                    .map((command) => (
                      <Command.Item
                        key={command.id}
                        value={command.label}
                        keywords={command.keywords}
                        onSelect={() => {
                          destination.current = command.href;
                          changeOpen(false);
                        }}
                      >
                        <span>
                          <span className="command-item-label">
                            {command.label}
                          </span>
                          <span className="command-item-hint">
                            {command.hint}
                          </span>
                        </span>
                        <span className="command-item-arrow" aria-hidden="true">
                          {command.group === "Profiles" ? "↗" : "↵"}
                        </span>
                      </Command.Item>
                    ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
          <p className="command-help">
            <span>
              <kbd>↑</kbd> <kbd>↓</kbd> Navigate
            </span>
            <span>
              <kbd>Enter</kbd> Open
            </span>
            <span>Profiles open in this tab</span>
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
