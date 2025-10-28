import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * AuthContext - Manages authentication state across the entire app
 *
 * Provides:
 * - user: Current authenticated user object (or null)
 * - token: JWT token for API requests
 * - login: Function to authenticate user
 * - signup: Function to register new user
 * - logout: Function to sign out user
 * - loading: Loading state during auth operations
 */
const AuthContext = createContext(null);

/**
 * Custom hook to access auth context
 * Usage: const { user, login, logout } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * AuthProvider Component
 * Wrap your app with this to provide auth state to all components
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base URL - change this to your backend URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  /**
   * Check if user is already logged in on app load
   * Fetches user data if token exists in localStorage
   */
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        // Verify token is still valid by fetching current user
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setToken(storedToken);
        } else {
          // Token is invalid, clear it
          localStorage.removeItem("token");
          setToken(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API_URL]);

  /**
   * Login function
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<boolean>} - Success status
   */
  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user data
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  /**
   * Signup function
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} name - User's name
   * @returns {Promise<boolean>} - Success status
   */
  const signup = async (email, password, name) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Store token and user data
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  /**
   * Logout function
   * Clears user data and token
   */
  const logout = async () => {
    setLoading(true);

    try {
      // Call logout endpoint to clear cookies on server
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    // Clear local storage and state
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setError(null);
    setLoading(false);
  };

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    loading,
    error,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
