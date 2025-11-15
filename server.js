import express from "express";

const app = express();

app.get("/api/notes", (req, res) => {
  res.status(200).send("api calleds u got 5 notes");
});

app.post("/api/notes", (req, res) => {
  res.status(201).json({ Message: "created a new note" });
});

app.put("/api/notes/:id", (req, res) => {
  res.status(200).json({ Message: "updated a note" });
});

app.delete("/api/notes/:id", (req, res) => {
  res.status(200).json({ Message: "deleted a note" });
});

app.listen(5001, () => {
  console.log("Server is running on port 5001: http://localhost:5001");
});
