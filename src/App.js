import React from "react";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import { nanoid } from "nanoid";

function App() {
  const [notes, setNotes] = React.useState([])
  const [currentNoteId, setCurrentNoteId] = React.useState(null)

  console.log(notes)

  function createNewNote() {
    setNotes(prevNotes => {
      return [...prevNotes, {
        title : `Note ${prevNotes.length + 1}`,
        body : "hello",
        id : nanoid(),
        selected : false
      }]
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
    console.log(e.target)
    console.log(noteId)
    setNotes(prevNotes => {
      return prevNotes.map(prevNote => {
        return prevNote.id === noteId
          ? {...prevNote, body : e.target.value}
          : prevNote
      })
    })
  }

  return (
    <div className="app">
      <Sidebar createNewNote={createNewNote} selectTask={selectTask} notes={notes} />
      <Editor notes={notes} editNote={editNote} currentNoteId={currentNoteId} />
    </div>
  );
}

export default App;
