import { filterFerroliList } from "./ferroli";
import { buildHeaders } from "./http";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://goldentrail.az";

export const fetchTestimonials = async () => {
  const headers = buildHeaders();

  const response = await fetch(`${API_BASE_URL}/api/testimonials`, {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch testimonials");
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return filterFerroliList(data);
};
