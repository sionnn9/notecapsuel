import user from "../models/user";

export async function login(req, res) {
  try {
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
}

export async function register(req, res) {}
