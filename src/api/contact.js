import { buildHeaders } from "./http";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://goldentrail.az";

export const submitContact = async (payload) => {
  const headers = buildHeaders({
    "Content-Type": "application/json",
  });

  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to submit contact request");
  }

  return response.json();
};
