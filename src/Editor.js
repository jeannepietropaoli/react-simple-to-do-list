import React from "react";

function Editor(props) {
    const currentNote = props.notes.find(note => note.selected)

    return(
        <textarea className="editor" onChange={(e) => props.editNote(e, props.currentNoteId)} value={currentNote ? currentNote.body : "nope nothing"}/>
    )
}

export default Editor