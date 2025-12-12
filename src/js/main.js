import "./notes.js";
import "../css/style.css";
import { fetchNotes, newNote, notes, pushNotesToDatabase } from "./notes.js";
import { renderNotes } from "./render.js";
import { initEvents } from "./events.js";

await fetchNotes();
renderNotes();
initEvents();