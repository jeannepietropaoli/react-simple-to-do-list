import React from "react";
import "./sidebar.css"
import logo from "./assets/taskGreen.png"
import plus from "./assets/plus.png"
import deleteProject from "./assets/deleteProject.png"

function Sidebar(props) {
    const noteTitleElements = props.projects.map(project => {
        const styles = {
            backgroundColor : project.selected ? "darkGray" : "transparent"
        }
        return (
            <div style={styles} key={project.id} onClick={() => props.selectProject(project.id)} className="sidebar--project-title">
                <h3 >{project.title}</h3>
                <img src={deleteProject} onClick={() => props.deleteProject(project.id)} />
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
                    props.createNewProject(newProjectTitle)
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