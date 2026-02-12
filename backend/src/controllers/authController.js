import user from "../models/user.js";

export async function register(req, res) {
  try {
    const newUser = await user.create(req.body);
    const data = res.status(201).json({ Message: "user created successfully" });
    if (!newUser) {
      return res.status(400).json({ Message: "alr exists" });
    }
  } catch (error) {
    console.error("error in register", error);
    res.status(500).json({ Message: "server error" });
  }
}

export async function login(req, res) {
  try {
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
}
