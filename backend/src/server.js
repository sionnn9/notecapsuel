import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.Port || 5001;

//middleware
// this should be before app.use(express.json()) to handle preflight requests because of CORS
app.use(
  cors({
    origin: "http://localhost:3000", // frontend url port
    credentials: true, // allow cookies to be sent
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`req method is ${req.method} and req url is ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port 5001: http://localhost:5001");
  });
});
