import React from "react";

function Editor(props) {
    const currentNote = props.notes.find(note => note.selected)

    return(
        <textarea placeholder="Note's title" className="editor" onChange={(e) => props.editNote(e, props.currentNoteId)} value={currentNote ? currentNote.body : "Select a task"}/>
    )
}

export default Editor