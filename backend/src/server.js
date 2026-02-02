import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Manual CORS headers FIRST - before any middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With",
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// CORS middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());

// Skip rate limiter for OPTIONS
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  return rateLimiter(req, res, next);
});

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.url} from ${req.headers.origin || "no-origin"}`,
  );
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!", status: "ok" });
});

app.use("/api/notes", notesRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
  });
});
