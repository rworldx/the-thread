"use client";

import { useSyncExternalStore } from "react";

/**
 * WATCHED PROGRESS — the first client state in a fully static site.
 *
 * localStorage only. No accounts, no auth surface, no PII, no GDPR obligation:
 * that is a security feature, not a shortcut (§9), and it stays that way in v1.
 *
 * HYDRATION is the hazard this module exists to contain. Reading localStorage
 * during render returns one value on the server and another in the browser;
 * React logs a warning nobody reads and then throws away the DOM and re-renders
 * it — 130 panels flashing on the order page.
 *
 * So: `useSyncExternalStore` with a SERVER SNAPSHOT of the neutral state. The
 * server renders "nothing watched", the client adopts the real set in a single
 * commit after mount. One frame of neutral, no mismatch, no flash across the list.
 *
 * Deliberately NOT solved with an inline <head> script. That needs a nonce under
 * the CSP, and a nonce-less inline script is exactly the trap the poster `fill`
 * style was: works now, dies silently the day the header lands.
 */

const KEY = "the-thread:watched";
const EVENT = "the-thread:watched-changed";

/** Cached so `getSnapshot` returns a stable reference — otherwise React loops. */
let cache: ReadonlySet<string> | null = null;
let cachedRaw: string | null = null;

/** The server, and the first client frame, both see this. */
const EMPTY: ReadonlySet<string> = new Set();

function read(): ReadonlySet<string> {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(KEY);
  if (raw === cachedRaw && cache) return cache;
  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    cache = new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    // A corrupt value is not worth crashing a page over.
    cache = EMPTY;
  }
  return cache;
}

function subscribe(onChange: () => void) {
  const handler = () => onChange();
  window.addEventListener(EVENT, handler);
  // Another tab writing the same key.
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function useWatched(): ReadonlySet<string> {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

/** True once the client store has taken over — for anything that must not flash. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export function toggleWatched(id: string) {
  const next = new Set(read());
  if (next.has(id)) next.delete(id);
  else next.add(id);
  window.localStorage.setItem(KEY, JSON.stringify([...next]));
  cachedRaw = null; // force a re-read on the next snapshot
  window.dispatchEvent(new Event(EVENT));
}

export function clearWatched() {
  window.localStorage.removeItem(KEY);
  cachedRaw = null;
  window.dispatchEvent(new Event(EVENT));
}

/**
 * A short, shareable code so progress can move between devices without an
 * account. Base64 of the sorted ids, which is not clever but is legible in a
 * bug report and survives a copy-paste.
 */
export function exportCode(watched: ReadonlySet<string>): string {
  return btoa(unescape(encodeURIComponent([...watched].sort().join(","))));
}

export function importCode(code: string): string[] {
  try {
    const decoded = decodeURIComponent(escape(atob(code.trim())));
    return decoded ? decoded.split(",").filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function applyImport(ids: string[]) {
  window.localStorage.setItem(KEY, JSON.stringify([...new Set(ids)]));
  cachedRaw = null;
  window.dispatchEvent(new Event(EVENT));
}

/** Last-visit stamp, for the "Previously…" recap. */
const SEEN_KEY = "the-thread:last-seen";

export function markSeen() {
  window.localStorage.setItem(SEEN_KEY, String(Date.now()));
}

export function daysSinceSeen(): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SEEN_KEY);
  if (!raw) return null;
  const then = Number(raw);
  if (!Number.isFinite(then)) return null;
  return Math.floor((Date.now() - then) / 86_400_000);
}
