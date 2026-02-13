import user from "../models/user.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await user.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

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
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
}
