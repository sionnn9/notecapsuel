import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user.id }); //get only the notes of logged in user

    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getAllNotes", error);
    res.status(500).json({ Message: "server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id, // ensures note belongs to logged-in user
    });
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
    const note = new Note({
      user: req.user.id,
      title,
      content,
    });
    await note.save(); //save to database
    res.status(201).json({ Message: "note created successfully" });
  } catch (error) {
    console.error("error in createNote", error);
    res.status(500).json({ Message: "server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // 🔐 IMPORTANT
      { title, content },
      { new: true },
    );

    if (!updatedNote) {
      return res
        .status(404)
        .json({ message: "Note not found or not authorized" });
    }

    res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error("error in updateNote ", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // 🔐 IMPORTANT
    });

    if (!deletedNote) {
      return res
        .status(404)
        .json({ message: "Note not found or not authorized" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("error in deleteNote ", error);
    res.status(500).json({ message: "Server error" });
  }
}
