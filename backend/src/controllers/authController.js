import user from "../models/user.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await user.create({
      name,
      email,
      password, // (hash this if using bcrypt)
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: error.message,
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
