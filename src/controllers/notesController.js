export const getAllNotes = (req, res) => {
  res.status(200).send("api calleds u got 5 notes");
};

export const createNote = (req, res) => {
  res.status(201).json({ Message: "created a new note" });
};

export const updateNote = (req, res) => {
  res.status(200).json({ Message: "updated a note" });
};

export const deleteNote = (req, res) => {
  res.status(200).json({ Message: "deleted a note" });
};
