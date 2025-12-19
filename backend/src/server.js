import express from "express";
import dotenv from "dotenv";
dotenv.config();
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.Port || 5001;

//middleware
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
