import { useEffect, useState } from "react";

export function usePersistedState<T>(key: string, initialState: T | (() => T)) {
  // read key from local storage if not found use initial value
  const [value, setValue] = useState<T>(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue
      ? JSON.parse(storedValue)
      : typeof initialState === "function"
      ? (initialState as () => T)()
      : initialState;
  });

  // update local storage when value change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}
