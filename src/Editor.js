import React from "react";
import NoteForm from "./NoteForm";
import deleteLogo from "./assets/delete.svg"
import "./editor.css"

function Editor(props) {
    const currentProject = props.projects.find(project => project.selected)
    const [formVisible, setFormVisible] = React.useState(false)

    const taskElements = currentProject ? currentProject.tasks.map(task => {
        return (
            <div className="task">
                <input className="task--title" name="title" onChange={(e) => props.editTask(e, task.id)} value={task.title} />
                <textarea className="task--description" name="description" onChange={(e) => props.editTask(e, task.id)} value={task.description} />
                <div  onClick={() => props.deleteTask(task.id)} className="task--delete-button" ></div>
            </div>
        )
    }) : null

    return(
        <main>
            <div className={`${formVisible ? "blury" : "visible"} editor`} >
                <h3>Selected project : {currentProject ? currentProject.title : ""}</h3>
                <div className="tasksGrid">
                    <div className="tasksGrid--headers">
                        <h4>Title</h4>
                        <h4>Description</h4>
                        <h4>Option</h4>
                    </div>
                    {currentProject && <button className="tasksGrid--add-button" onClick={() => setFormVisible(true)}>Create a new note</button>}
                    {!currentProject && <button className="taskGrid--select-project-button">Select a project</button>}
                    {taskElements}
                </div>
            </div>
            {formVisible && <NoteForm quitForm={() => setFormVisible(false)} submitNewTask={(formData, currentProjectId) => {props.submitNewTask(formData, currentProjectId); setFormVisible(false)}} currentProjectId={currentProject.id} />}
        </main>
    )
}

export default Editor