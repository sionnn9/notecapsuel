import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration - MUST be FIRST
const allowedOrigins = [
  "http://localhost:3000",
  "https://notecapsuel.vercel.app",
  "https://www.notecapsuel.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`❌ Blocked by CORS: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Length", "Content-Type"],
  maxAge: 86400,
};

// Apply CORS FIRST
app.use(cors(corsOptions));

// Handle preflight explicitly
app.options("*", cors(corsOptions));

// JSON parser
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.url} from origin: ${req.headers.origin || "no-origin"}`,
  );
  next();
});

// Apply rate limiter AFTER CORS, and skip for OPTIONS
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next(); // Skip rate limiting for preflight
  }
  return rateLimiter(req, res, next);
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!", status: "ok" });
});

// Routes
app.use("/api/notes", notesRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
  });
});
