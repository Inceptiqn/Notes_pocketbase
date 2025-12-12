import { getNotes } from "./notes";

export function renderNotes() {
  const notesContainer = document.getElementById("notes-list");
  const notes = getNotes().filter((note) => !note.toDelete);
  notesContainer.innerHTML = notes.map((note) => createNote(note)).join("");
}

function createNote(note) {
  return `
    <div class="note-item p-3 rounded-lg cursor-pointer hover:bg-base-200 border-l-4 border-primary" data-note-id="${
      note.id
    }">
      <h3 class="font-semibold text-sm truncate">${
        note.title || "Untitled"
      }</h3>
      <p class="text-xs text-base-content/70 mt-1 line-clamp-2">
        ${note.content || "No content"}
      </p>
      <div class="text-xs text-base-content/50 mt-2">${
        note.updated || "no date"
      }</div>
    </div>
  `;
}
