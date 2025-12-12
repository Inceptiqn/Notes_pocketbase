import {
  getNoteById,
  pushNotesToDatabase,
  saveNote,
  newNote,
  deleteNote,
} from "./notes.js";
import { renderNotes } from "./render.js";

let currentNoteId = null;

export function getCurrentNoteId() {
  return currentNoteId;
}

export function initEvents() {
  document.getElementById("notes-list").addEventListener("click", (event) => {
    const noteItem = event.target.closest(".note-item");
    if (noteItem) {
      loadNoteInEditor(noteItem);
    }
  });
  document.getElementById("new-note-btn").addEventListener("click", () => {
    newNote("New Note");
    renderNotes();
  });
  document.getElementById("save-btn").addEventListener("click", saveNote);
  document.getElementById("delete-btn").addEventListener("click", deleteNote);
  document.getElementById("sync-btn").addEventListener("click", async () => {
    try {
      await pushNotesToDatabase();
      console.log("Notes synced successfully");
    } catch (error) {
      console.error("Failed to sync notes:", error);
    }
  });
}

function loadNoteInEditor(noteElement) {
  currentNoteId = noteElement.getAttribute("data-note-id");

  const note = getNoteById(currentNoteId);

  if (note) {
    document.getElementById("note-title").value = note.title || "";
    document.getElementById("note-content").value = note.content || "";
    console.log("Loaded note with ID:", note.id);
  } else {
    console.error("Note not found with ID:", currentNoteId);
  }
}
