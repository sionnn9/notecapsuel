import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

//middleware
// this should be before app.use(express.json()) to handle preflight requests because of CORS
const allowedOrigins = ["http://localhost:3000", process.env.FRONTEND_URL]; //idk why but u have to put the vercel link in env as frontend url cant put directly cc:machado for helping

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter);
app.use(authMiddleware); // Apply auth middleware globally to protect all routes, can be moved to specific routes if needed

app.use((req, res, next) => {
  console.log(`req method is ${req.method} and req url is ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
  });
});
