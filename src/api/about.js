import { keepFerroliObject } from "./ferroli";
import { buildHeaders } from "./http";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://goldentrail.az";
const ABOUT_IMAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_BASE_URL || `${API_BASE_URL}/storage`;

const startsWithProtocol = (value) => /^https?:\/\//i.test(value);

export const formatAboutImageUrl = (path) => {
  if (!path) return "";

  if (startsWithProtocol(path)) {
    return path;
  }

  const normalizedBase = ABOUT_IMAGE_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.replace(/^\//, "");

  return `${normalizedBase}/${normalizedPath}`;
};

export const fetchAbout = async () => {
  const headers = buildHeaders();

  const response = await fetch(`${API_BASE_URL}/api/about-us`, {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch about data");
  }

  const data = await response.json();
  const ferroliAbout = keepFerroliObject(data);

  if (!ferroliAbout) {
    return null;
  }

  return {
    ...ferroliAbout,
    image: formatAboutImageUrl(ferroliAbout.image),
  };
};
