import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// 1. EXACT ORIGINS: Must include the protocol (https://)
const allowedOrigins = [
  "http://localhost:3000",
  "https://notecapsuel.vercel.app",
];

// 2. CONFIGURE CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));

// 3. EXPLICIT OPTIONS HANDLER: This is why your preflight was failing.
// The browser sends an OPTIONS request before POST/PUT/DELETE.
app.options("*", cors(corsOptions));

app.use(express.json());

// 4. RATE LIMITER: Move this AFTER CORS so it doesn't block preflights.
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(
    `📨 ${req.method} ${req.url} from ${req.headers.origin || "no-origin"}`,
  );
  next();
});

app.use("/api/notes", notesRoutes);

// Health check for Render
app.get("/", (req, res) => res.json({ status: "Backend is running!" }));

// 5. SECURE START: Log errors to find why it exits with "Status 1".
connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(
      "❌ Database connection error. Check your MONGODB_URI in Render settings:",
      err,
    );
    process.exit(1);
  });
