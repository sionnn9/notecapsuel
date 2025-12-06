import Note from "../models/note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //fetch all notes from database
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getAllNotes", error);
    res.status(500).json({ Message: "server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id); //fetch specific note from database
    if (!note) {
      return res.status(404).json({ Message: "note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("error in getNoteById", error);
    res.status(500).json({ Message: "server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save(); //save to database
    res.status(201).json({ Message: "note created successfully" });
  } catch (error) {
    console.error("error in createNote", error);
    res.status(500).json({ Message: "server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    if (!updatedNote) {
      return res.status(404).json({ Message: "note not found" });
    }
    res.status(200).json({ Message: "note updated successfully" });
  } catch (error) {
    console.error("error in updateNote ", error);
    res.status(500).json({ Message: "server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const { title, content } = req.body;
    const deleteNote = await Note.findByIdAndDelete(req.params.id, {
      title,
      content,
    });
    if (!deleteNote) {
      return res.status(404).json({ Message: "note not found" });
    }
    res.status(200).json({ Message: "note deleted successfully" });
  } catch (error) {
    console.error("error in deleteNote ", error);
    res.status(500).json({ Message: "server error" });
  }
}
