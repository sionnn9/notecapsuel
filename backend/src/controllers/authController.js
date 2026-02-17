import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookies from "cookie-parser";
dotenv.config();
/*this is a register function that will be called when a user tries to register on the platform. 
It will take the name, email, and password from the request body, validate them, check if the user already exists, 
hash the password, and create a new user in the database. If successful, 
it will return a success message and the user ID. 
If there are any errors during this process, it will return appropriate error messages.*/

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
    console.log("New user created:", newUser);
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
// This is a login function that will be called when a user tries to log in to the platform.
// It will take the email and password from the request body, validate them, check if the user exists,
// compare the provided password with the hashed password in the database, and if they match,
// it will return a success message. If there are any errors during this process, it will return appropriate error messages.
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    // Check if user exists
    const existingUser = await user.findOne({ email });
    // If user doesn't exist, return error
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Invalid credentials email not in our DB" });
    }
    // Compare provided password with hashed password in the database
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    // If passwords don't match, return error
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials wrong password" });
    }
    // console.log("ENV CHECK:", process.env.JWT_SECRET);

    // If credentials are valid, create a JWT token
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
}
