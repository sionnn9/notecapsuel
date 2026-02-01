import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// CORS - Allow all origins for now (we'll restrict later once it works)
app.use(
  cors({
    origin: "*", // Allow all origins temporarily
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

app.use(express.json());

// Skip rate limiter for OPTIONS requests
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
  console.log(`404: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Not found" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
