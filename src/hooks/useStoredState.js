import { useEffect, useState } from "react";

export function loadJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export default function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => loadJSON(key, fallback));
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
