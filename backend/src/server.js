import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

/* ---------------- CORS CONFIG ---------------- */
const allowedOrigins = [
  "http://localhost:3000",
  "https://notecapsuel.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Explicitly handle preflight
app.options("*", cors());

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`req method: ${req.method}, req url: ${req.url}`);
  next();
});

/* ---------------- ROUTES ---------------- */
app.use("/api/notes", notesRoutes);

/* ---------------- START SERVER ---------------- */
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
