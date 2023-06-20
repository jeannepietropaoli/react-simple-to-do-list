import React from "react";
import "./sidebar.css"
import logo from "./assets/taskGreen.png"
import plus from "./assets/plus.png"
import deleteProject from "./assets/deleteProject.png"

function Sidebar(props) {
    const noteTitleElements = props.notes.map(note => {
        const styles = {
            backgroundColor : note.selected ? "darkGray" : "transparent"
        }
        return (
            <div style={styles} key={note.id} onClick={() => props.selectTask(note.id)} className="sidebar--project-title">
                <h3 >{note.title}</h3>
                <img src={deleteProject} onClick={() => props.deleteNote(note.id)} />
            </div>
        )
    })

    const [newProjectTitle, setNewProjectTitle] = React.useState("")

    return(
        <div className="sidebar">
            <div className="sidebar--logo-container">
                <img id="sidebar--logo" alt="app logo" src={logo} />
                <h1 className="sidebar--app-title">T'ASK</h1>
            </div>
            <div className="sidebar--new-project">
                <input value={newProjectTitle} onChange={(e) => setNewProjectTitle(e.target.value)} id="sidebar--new-project-title" type="text" placeholder="Your new project ..." />
                <button id="sidebar--add-project-button" onClick={() => {
                    props.createNewNote(newProjectTitle)
                    setNewProjectTitle("")
                    }}>
                    <img alt="plus logo" src={plus} />
                </button>
            </div>
            <div className="sidebar--project-titles">
                {noteTitleElements}
            </div>
        </div>
    )
}

export default Sidebar