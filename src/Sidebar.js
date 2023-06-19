import React from "react";

function Sidebar(props) {
    const noteTitleElements = props.notes.map(note => {
        const styles = {
            backgroundColor : note.selected ? "darkGray" : "transparent"
        }
        return (
            <div key={note.id} className="sidebar--task">
                <h3 style={styles} onClick={() => props.selectTask(note.id)}>{note.title}</h3>
                <button onClick={() => props.deleteNote(note.id)}>X</button>
            </div>
        )
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