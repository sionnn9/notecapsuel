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
  "https://notecapsuel.vercel.app", // ← Added https://
  "https://www.notecapsuel.vercel.app", // ← Added www variant
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log(`Blocked by CORS: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`req method is ${req.method} and req url is ${req.url}`);
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
