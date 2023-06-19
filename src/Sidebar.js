import React from "react";

function Sidebar(props) {
    const noteTitleElements = props.notes.map(note => {
        return <h3 key={note.id} onClick={() => props.selectTask(note.id)}>{note.title}</h3>
    })

    return(
        <div className="sidebar">
            <h1>Notes</h1>
            <button onClick={props.createNewNote}>+</button>
            <div className="sidebar--titles">
                {noteTitleElements}
            </div>
        </div>
    )
}

export default Sidebar