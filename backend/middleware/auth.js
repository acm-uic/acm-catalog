import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Authentication Middleware - Protects routes that require authentication
 *
 * How it works:
 * 1. Checks if JWT token exists in cookies or Authorization header
 * 2. Verifies the token is valid and not expired
 * 3. Finds the user from the token's ID
 * 4. Attaches user to request object for use in route handlers
 *
 * Usage:
 * app.get('/protected-route', protect, (req, res) => {
 *   // req.user is now available with authenticated user data
 * });
 */
export const protect = async (req, res, next) => {
  let token;

  // Check for token in cookies (most secure for browser apps)
  if (req.cookies.token) {
    token = req.cookies.token;
  }
  // Also check Authorization header (for API clients, mobile apps, etc.)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token found, user is not authenticated
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }

  try {
    // Verify token is valid and decode it
    // JWT_SECRET is the same secret used to create the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from token payload
    // Exclude password from result
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // User is authenticated, continue to next middleware/route handler
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};
