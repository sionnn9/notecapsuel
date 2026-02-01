import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// 1. EXACT ORIGINS (Must include https:// and no trailing slashes)
const allowedOrigins = [
  "http://localhost:3000",
  "https://notecapsuel.vercel.app", // Added https:// - crucial!
];

// 2. CORS MUST BE FIRST
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps/Postman) or matching list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("CORS blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

// 3. EXPLICIT OPTIONS HANDLER
// This answers the browser's "preflight" request immediately before any other logic
app.options("*", cors());

// 4. OTHER MIDDLEWARE
app.use(express.json());

// 5. SKIP RATE LIMITER FOR OPTIONS
app.use((req, res, next) => {
  if (req.method === "OPTIONS") return next();
  rateLimiter(req, res, next);
});

// Logging
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url} | Origin: ${req.headers.origin}`);
  next();
});

// Routes
app.get("/", (req, res) => res.json({ message: "Backend is live!" }));
app.use("/api/notes", notesRoutes);

// Connect and Start
connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });
