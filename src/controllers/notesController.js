import Note from "../models/note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getAllNotes", error);
    res.status(500).json({ Message: "server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ Message: "note created successfully" });
  } catch (error) {
    console.error("error in createNote", error);
    res.status(500).json({ Message: "server error" });
  }
}

export async function updateNote(req, res) {
  res.status(200).json({ Message: "updated a note" });
}

export async function deleteNote(req, res) {
  res.status(200).json({ Message: "deleted a note" });
}
