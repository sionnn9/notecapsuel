import express from "express";

const app = express();

app.get("/api/notes", (req, res) => {
  res.status(200).send("api calleds u got 5 notes");
});

app.listen(5001, () => {
  console.log("Server is running on port 5001: http://localhost:5001");
});
