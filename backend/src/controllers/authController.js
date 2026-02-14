import user from "../models/user.js";
import bcrypt from "bcryptjs";
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    // Basic validation all fields are required
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    // Check if user already exists
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });
    // Return success response
    return res.status(201).json({
      message: "User created successfully",
      userId: newUser._id, // Optionally return a token here if you want to log in immediately after registration
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    // Handle duplicate key error (email already exists)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    return res.status(500).json({
      message: "Server error",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
}
