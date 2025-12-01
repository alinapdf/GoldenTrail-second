import { buildHeaders } from "./http";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://goldentrail.az";

const sanitizeId = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const fetchAddresses = async () => {
  const headers = buildHeaders();

  const response = await fetch(`${API_BASE_URL}/api/profile/addresses`, {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to load addresses");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const createAddress = async (payload) => {
  const headers = buildHeaders({
    "Content-Type": "application/json",
  });

  const response = await fetch(`${API_BASE_URL}/api/profile/addresses`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create address");
  }

  const data = await response.json();
  return data && typeof data === "object" ? data : null;
};

export const updateAddress = async (id, payload) => {
  const normalizedId = sanitizeId(id);

  if (!normalizedId) {
    throw new Error("Invalid address id");
  }

  const headers = buildHeaders({
    "Content-Type": "application/json",
  });

  const response = await fetch(`${API_BASE_URL}/api/profile/addresses/${normalizedId}`, {
    method: "PUT",
    credentials: "include",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update address");
  }

  const data = await response.json();
  return data && typeof data === "object" ? data : null;
};

export const deleteAddress = async (id) => {
  const normalizedId = sanitizeId(id);

  if (!normalizedId) {
    throw new Error("Invalid address id");
  }

  const headers = buildHeaders();

  const response = await fetch(`${API_BASE_URL}/api/profile/addresses/${normalizedId}`, {
    method: "DELETE",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to delete address");
  }

  const data = await response.json();
  return data && typeof data === "object" ? data : null;
};
