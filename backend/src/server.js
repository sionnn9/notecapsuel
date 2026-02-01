import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Manual CORS headers - MUST be first, before any other middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With",
  );
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight OPTIONS request immediately
  if (req.method === "OPTIONS") {
    console.log(`✅ OPTIONS ${req.url} - Preflight handled`);
    return res.status(200).end();
  }
  next();
});

// CORS middleware as backup
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `📨 ${req.method} ${req.url} from ${req.headers.origin || "no-origin"}`,
  );
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!", status: "ok" });
});

app.use("/api/notes", notesRoutes);

// 404 handler
app.use((req, res) => {
  console.log(`❌ 404: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("💥 Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
