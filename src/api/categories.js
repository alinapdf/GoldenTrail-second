import { filterFerroliTree } from "./ferroli";
import { buildHeaders } from "./http";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://goldentrail.az";

const normalizeCategories = (categories = []) =>
  filterFerroliTree(categories).map((category) => ({
    id: category.id,
    slug: category.slug,
    name: category.name,
    children: normalizeCategories(category.children),
  }));

export const fetchCategories = async () => {
  const headers = buildHeaders();

  const response = await fetch(`${API_BASE_URL}/api/categories`, {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();

  return normalizeCategories(data);
};
