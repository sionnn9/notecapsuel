import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// 1. Global Middleware
app.use(express.json());

// 2. CORS configuration for specific origins
const corsOptions = {
  origin: "https://notecapsuel.vercel.app",
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

// 3. Handle the Preflight (OPTIONS) request for ALL routes
// Browsers send this BEFORE the actual CRUD call.
// Without this, the route-specific CORS will still fail.
app.options("*", cors(corsOptions));

// 4. Applying CORS "right above" your specific notes route
// This is the Express equivalent of @CrossOrigin
app.use("/api/notes", cors(corsOptions), notesRoutes);

// Database and Server start
connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});
