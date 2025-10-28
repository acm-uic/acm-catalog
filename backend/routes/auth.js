import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/**
 * Helper function to generate JWT token
 *
 * @param {string} id - User's MongoDB _id
 * @returns {string} - Signed JWT token
 *
 * The token contains:
 * - id: User's database ID (payload)
 * - Signed with JWT_SECRET (only server knows this)
 * - Expires in 30 days
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token valid for 30 days
  });
};

/**
 * Helper function to send token as HTTP-only cookie
 *
 * @param {object} res - Express response object
 * @param {string} token - JWT token to send
 *
 * Why HTTP-only cookies?
 * - More secure than localStorage (can't be accessed by JavaScript)
 * - Protected against XSS attacks
 * - Automatically sent with requests to same domain
 */
const sendTokenResponse = (res, token, user) => {
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true, // Cookie only accessible by web server (not JavaScript)
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict", // CSRF protection
  };

  res.cookie("token", token, options);
};

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 *
 * Request body: { email, password, name }
 * Response: { success, token, user }
 */
router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create new user
    // Password will be automatically hashed by the pre-save hook in User model
    const user = await User.create({
      email,
      password,
      name,
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // Send token as cookie
    sendTokenResponse(res, token, user);

    // Send response (don't send password back)
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user & get token
 * @access  Public
 *
 * Request body: { email, password }
 * Response: { success, token, user }
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user by email and explicitly select password (it's excluded by default)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if password matches using our comparePassword method
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Send token as cookie
    sendTokenResponse(res, token, user);

    // Send response (don't send password back)
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user / clear cookie
 * @access  Public
 *
 * Response: { success, message }
 */
router.post("/logout", (req, res) => {
  // Clear the token cookie
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 1000), // Expire in 1 second
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged in user
 * @access  Private (requires authentication)
 *
 * Response: { success, user }
 *
 * The 'protect' middleware runs first:
 * - Verifies JWT token
 * - Attaches user to req.user
 * - Only then does this route handler run
 */
router.get("/me", protect, async (req, res) => {
  try {
    // req.user is set by the protect middleware
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user data",
    });
  }
});

export default router;
