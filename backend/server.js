import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use(cookieParser()); // Parse cookies (needed for JWT in cookies)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Your React app URL
    credentials: true, // Allow cookies to be sent
  })
);

// Routes
app.use("/api/auth", authRoutes); // Authentication routes

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// Start server
server.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
