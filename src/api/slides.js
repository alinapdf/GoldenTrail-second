import { buildHeaders } from "./http";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://goldentrail.az";
const SLIDE_IMAGE_BASE_URL =
  import.meta.env.VITE_SLIDE_IMAGE_BASE_URL || `${API_BASE_URL}/storage`;

const startsWithProtocol = (value) => /^https?:\/\//i.test(value);

export const formatSlideImageUrl = (path) => {
  if (!path) return "";

  if (startsWithProtocol(path)) {
    return path;
  }

  const normalizedBase = SLIDE_IMAGE_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.replace(/^\//, "");

  return `${normalizedBase}/${normalizedPath}`;
};

export const fetchSlides = async () => {
  const headers = buildHeaders();

  const response = await fetch(`${API_BASE_URL}/api/slides`, {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch slides");
  }

  const data = await response.json();
  return data;
};
