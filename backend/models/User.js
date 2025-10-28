import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * User Schema - Defines the structure of user documents in MongoDB
 *
 * Fields:
 * - email: User's email (unique, required)
 * - password: Hashed password (required, never sent to client)
 * - name: User's display name (optional)
 * - createdAt: Timestamp when account was created
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false, // Don't return password by default in queries
  },
  name: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Pre-save middleware - Automatically hashes password before saving to database
 * This runs before every save() operation
 *
 * Why hash passwords?
 * - Never store plain text passwords in database
 * - If database is compromised, passwords are protected
 * - bcrypt is one-way encryption (can't be reversed)
 */
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt (random data) - 10 rounds is standard
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Instance method to compare passwords
 * Used during login to verify user's password
 *
 * @param {string} enteredPassword - The password user entered during login
 * @returns {boolean} - True if passwords match, false otherwise
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
