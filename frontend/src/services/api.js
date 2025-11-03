/**
 * API Service
 * Centralized API configuration and helper functions
 *
 * This module provides:
 * - Base API URL configuration
 * - Reusable fetch wrapper with auth headers
 * - Error handling
 * - Token management
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Get auth token from localStorage
 */
const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Generic API request helper
 * Automatically adds auth headers and handles errors
 *
 * @param {string} endpoint - API endpoint (e.g., '/catalog/items')
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise} - Response data
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

  // Default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add Authorization header if token exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Make the request
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", // Include cookies
  });

  // Parse response
  const data = await response.json();

  // Handle errors
  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
};

/**
 * Convenience methods for different HTTP verbs
 */
export const api = {
  // GET request
  get: (endpoint) => apiRequest(endpoint, { method: "GET" }),

  // POST request
  post: (endpoint, body) =>
    apiRequest(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  // PUT request
  put: (endpoint, body) =>
    apiRequest(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  // PATCH request
  patch: (endpoint, body) =>
    apiRequest(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  // DELETE request
  delete: (endpoint) => apiRequest(endpoint, { method: "DELETE" }),
};

/**
 * Auth-specific API calls
 * These are already handled in AuthContext, but shown here for reference
 */
export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  signup: (email, password, name) =>
    api.post("/auth/signup", { email, password, name }),
  logout: () => api.post("/auth/logout"),
  getCurrentUser: () => api.get("/auth/me"),
};

/**
 * Example: Catalog API calls
 * Add your own API endpoints here as you build features
 */
export const catalogAPI = {
  // Get all catalog items
  getAllItems: () => api.get("/catalog/items"),

  // Get single item by ID
  getItemById: (id) => api.get(`/catalog/items/${id}`),

  // Create new item (protected - requires auth)
  createItem: (itemData) => api.post("/catalog/items", itemData),

  // Update item (protected - requires auth)
  updateItem: (id, itemData) => api.put(`/catalog/items/${id}`, itemData),

  // Delete item (protected - requires auth)
  deleteItem: (id) => api.delete(`/catalog/items/${id}`),
};

export default api;
