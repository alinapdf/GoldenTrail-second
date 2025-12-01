import { isFerroliItem } from "./ferroli";

export const resolveLanguage = () => {
  if (typeof window === "undefined") return null;

  const stored = window.localStorage.getItem("language");
  if (stored) return stored;

  if (window.navigator?.language) {
    return window.navigator.language.split("-")[0];
  }

  return null;
};

const resolveFerroliHeader = () => {
  const flag = import.meta.env.VITE_IS_FERROLI ?? 1;
  return isFerroliItem(flag) ? { "X-Is-Ferroli": "1" } : {};
};

export const buildHeaders = (baseHeaders = {}) => {
  const language = resolveLanguage();

  return {
    ...baseHeaders,
    ...(language ? { "X-Language": language } : {}),
    ...resolveFerroliHeader(),
  };
};
