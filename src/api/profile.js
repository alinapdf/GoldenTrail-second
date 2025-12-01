import { buildHeaders } from "./http";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://goldentrail.az";

export const fetchProfile = async () => {
  const headers = buildHeaders();

  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to load profile");
  }

  const data = await response.json();
  return data && typeof data === "object" ? data : null;
};

export const updateProfile = async (payload) => {
  const headers = buildHeaders({
    "Content-Type": "application/json",
  });

  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "PUT",
    credentials: "include",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  const data = await response.json();
  return data && typeof data === "object" ? data : null;
};
