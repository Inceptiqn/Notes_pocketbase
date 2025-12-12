import PocketBase from "pocketbase";
import { getCurrentNoteId } from "./events";
import { renderNotes } from "./render";

const pb = new PocketBase("http://127.0.0.1:8090");
let nextLocalId = 0;
let notes = [];

//LOCAL

function sortNotes() {
  notes.sort((a, b) => new Date(b.updated) - new Date(a.updated));
}

export function getNotes() {
  return notes;
}

export function getNoteById(noteId) {
  return notes.find((note) => note.id == noteId);
}

export function newNote(title) {
  const note = {
    id: ++nextLocalId,
    title,
    content: "",
    synced: false,
    toDelete: false,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  };
  notes.unshift(note);
  return note;
}

export function editNote(noteId, newTitle, newContent) {
  const note = notes.find((n) => n.id === noteId);
  if (note) {
    note.title = newTitle;
    if (newContent !== undefined) {
      note.content = newContent;
    }
    note.updated = new Date().toISOString();
    note.synced = false;
    sortNotes();
  }
  return note;
}

export function saveNote() {
  const currentNoteId = getCurrentNoteId();
  const note = getNoteById(currentNoteId);
  if (note) {
    note.title = document.getElementById("note-title").value;
    note.content = document.getElementById("note-content").value;
    note.updated = new Date().toISOString();
    note.synced = false;
    sortNotes();
    console.log("Saved note with ID:", note.id);
    renderNotes();
  } else {
    console.log("Note not found with ID:", currentNoteId);
  }
}
export function deleteNote() {
  const id = getCurrentNoteId();
  const note = notes.find((n) => n.id == id);
  if (note) {
    note.toDelete = true;
    note.synced = false;
  }
  renderNotes();
}

//DB

export async function fetchNotes() {
  const dbNotes = await pb.collection("Notes").getFullList({});
  notes = dbNotes.map((note) => ({
    ...note,
    synced: true,
  }));
  sortNotes();
}

export async function pushNotesToDatabase() {
  const unsyncedNotes = notes.filter((note) => !note.synced);
  try {
    for (const note of unsyncedNotes) {
      if (note.toDelete && note.id) {
        await pb.collection("Notes").delete(note.id);
        console.log("deleted note with id:", note.id);
      } else if (typeof note.id === "string" && note.id.length > 10) {
        await pb.collection("Notes").update(note.id, {
          title: note.title,
          content: note.content,
          updated: note.updated,
        });
        note.synced = true;
        console.log("updated note with id:", note.id);
      } else {
        const record = await pb.collection("Notes").create({
          title: note.title,
          content: note.content,
          created: note.created,
          updated: note.updated,
        });

        note.id = record.id;
        note.synced = true;
        console.log("synced note with id:", note.id);
      }
    }

    notes = notes.filter((note) => !note.toDelete);
  } catch (e) {
    console.error("Sync failed: ", e);
  } finally {
    nextLocalId = 0;
  }
}

export { notes };
