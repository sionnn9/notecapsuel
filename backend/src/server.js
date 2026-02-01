import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// 1. SPECIFIC CORS CONFIGURATION
const allowedOrigins = [
  "https://notecapsuel.vercel.app", // Your Vercel frontend
  "http://localhost:3000", // Local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

app.use(express.json());

// 2. RATE LIMITER (Handled after CORS)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") return next();
  return rateLimiter(req, res, next);
});

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!", status: "ok" });
});

app.use("/api/notes", notesRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
    process.exit(1); // Triggers "Status 1" if DB fails
  });
