"use client";

import { useRef } from "react";
import { navigation } from "@/content/navigation";

export function MobileNavigation() {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);

  return (
    <details
      className="mobile-navigation"
      ref={disclosure}
      onKeyDown={(event) => {
        if (event.key === "Escape" && disclosure.current?.open) {
          disclosure.current.open = false;
          trigger.current?.focus();
        }
      }}
    >
      <summary ref={trigger}>
        <span>Menu</span>
        <span className="menu-symbol" aria-hidden="true">
          +
        </span>
      </summary>
      <nav aria-label="Mobile navigation">
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => {
              if (disclosure.current) disclosure.current.open = false;
            }}
          >
            {item.label}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </details>
  );
}
