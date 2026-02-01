import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

//middleware
// this should be before app.use(express.json()) to handle preflight requests because of CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://notecapsuel.vercel.app",
  "https://www.notecapsuel.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`❌ Blocked by CORS: ${origin}`);
        callback(null, false); // ← FIXED: Don't throw error, just reject
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Length", "Content-Type"],
    maxAge: 86400, // 24 hours - cache preflight response
  }),
);

// Explicitly handle preflight OPTIONS requests
app.options("*", cors());

app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.url} from origin: ${req.headers.origin || "no-origin"}`,
  );
  next();
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!", status: "ok" });
});

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
  });
});
