import express from "express";
import dotenv from "dotenv";
dotenv.config();
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();

connectDB();
app.use("/api/notes", notesRoutes);

app.listen(5001, () => {
  console.log("Server is running on port 5001: http://localhost:5001");
});
