import React from "react";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import { nanoid } from "nanoid";

function App() {
  const [notes, setNotes] = React.useState([])

  console.log(notes)
  function createNewNote() {
    console.log("new note")
    setNotes(prevNotes => {
      return [...prevNotes, {
        title : `Note ${prevNotes.length + 1}`,
        body : "",
        id : nanoid()
      }]
    })
  }

  function selectTask(noteId) {
    console.log(noteId)
  }

  return (
    <div className="app">
      <Sidebar createNewNote={createNewNote} selectTask={selectTask} notes={notes} />
      <Editor />
    </div>
  );
}

export default App;
