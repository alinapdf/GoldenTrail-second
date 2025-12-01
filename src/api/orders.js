import { filterFerroliList, keepFerroliObject } from "./ferroli";
import { buildHeaders } from "./http";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://goldentrail.az";

const sanitizeNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
};

export const createOrder = async ({ paymentMethodId, shippingMethodId }) => {
  const normalizedPayment = sanitizeNumber(paymentMethodId);
  const normalizedShipping = sanitizeNumber(shippingMethodId);

  if (!normalizedPayment || !normalizedShipping) {
    throw new Error("Invalid order payload");
  }

  const headers = buildHeaders({
    "Content-Type": "application/json",
  });

  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify({
      payment_method_id: normalizedPayment,
      shipping_method_id: normalizedShipping,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
};

export const fetchOrders = async () => {
  const headers = buildHeaders();

  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to load orders");
  }

  const data = await response.json();
  return Array.isArray(data) ? filterFerroliList(data) : [];
};

export const fetchOrderById = async (orderId) => {
  const id = Number(orderId);

  if (!Number.isFinite(id)) {
    throw new Error("Invalid order id");
  }

  const headers = buildHeaders();

  const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to load order details");
  }

  const data = await response.json();
  const ferroliOrder = keepFerroliObject(data);

  if (!ferroliOrder) {
    throw new Error("Order not available for this site");
  }

  return ferroliOrder;
};
