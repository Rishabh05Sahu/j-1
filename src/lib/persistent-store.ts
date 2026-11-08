/**
 * A tiny localStorage-backed external store designed for
 * `useSyncExternalStore`. The server snapshot is always the initial value,
 * which guarantees the server HTML and the first client render match
 * (no hydration mismatch); the persisted value is applied immediately after.
 */
export interface PersistentStore<T> {
  get: () => T;
  getServer: () => T;
  set: (updater: T | ((prev: T) => T)) => void;
  subscribe: (listener: () => void) => () => void;
}

export function createPersistentStore<T>(
  key: string,
  initial: T,
  sanitize: (raw: unknown) => T,
): PersistentStore<T> {
  let state: T = initial;
  let loaded = false;
  const listeners = new Set<() => void>();

  const load = () => {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) state = sanitize(JSON.parse(raw));
    } catch {
      state = initial;
    }
  };

  const emit = () => listeners.forEach((l) => l());

  return {
    get: () => {
      load();
      return state;
    },
    getServer: () => initial,
    set: (updater) => {
      load();
      state = typeof updater === "function" ? (updater as (prev: T) => T)(state) : updater;
      try {
        window.localStorage.setItem(key, JSON.stringify(state));
      } catch {
        /* storage may be unavailable (private mode / quota) — keep in memory */
      }
      emit();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      const onStorage = (e: StorageEvent) => {
        if (e.key !== key) return;
        try {
          state = e.newValue ? sanitize(JSON.parse(e.newValue)) : initial;
        } catch {
          state = initial;
        }
        emit();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
      };
    },
  };
}
