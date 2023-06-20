import React from "react";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import { nanoid } from "nanoid";

function App() {
  const [notes, setNotes] = React.useState(JSON.parse(localStorage.getItem("notes")) || [])
  const [currentNoteId, setCurrentNoteId] = React.useState(null)

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  function exportNoteTitle(noteBody, note) {
    const regex = /^.*(?=\n)/g
    const matches = noteBody.match(regex)
    return matches === null ? note.title : matches[0]
  }

  function createNewNote(title) {
    const newNote = {
      title : title || `Note ${notes.length + 1}`,
      body : "",
      id : nanoid(),
      selected : false
    }
    setNotes(prevNotes => {
      return [...prevNotes, newNote]
    })
  }

  function findNoteIndex(noteId) {
    const note = notes.filter(note => note.id === noteId)[0]
    return notes.indexOf(note)
  }

  function selectTask(noteId) {
    setNotes(prevNotes => {
      return prevNotes.map(prevNote => {
        return prevNote.id === noteId
          ? {...prevNote, selected : true}
          : {...prevNote, selected : false}
      })
    })
    setCurrentNoteId(noteId)
  }

  function editNote(e, noteId) {
    setNotes(prevNotes => {
      return prevNotes.map(prevNote => {
        return prevNote.id === noteId
          ? {...prevNote, body : e.target.value, title : exportNoteTitle(e.target.value, prevNote)}
          : prevNote
      })
    })
  }

  function deleteNote(noteId) {
    return setNotes(prevNotes => {
      return prevNotes.filter(prevNote => prevNote.id !== noteId)
    })
  }

  return (
    <div className="app">
      <Sidebar createNewNote={createNewNote} selectTask={selectTask} deleteNote={deleteNote} notes={notes} />
      <Editor notes={notes} editNote={editNote} currentNoteId={currentNoteId} />
    </div>
  );
}

export default App;
