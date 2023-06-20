import React from "react";
import NoteForm from "./NoteForm";
import deleteLogo from "./assets/delete.svg"
import "./editor.css"

function Editor(props) {
    const [formVisible, setFormVisible] = React.useState(false)
    const taskElements = props.currentProject 
        ? props.currentProject.tasks.map(task => {
            return (
                <div className="taskGrid--task">
                    <input className="task--title" name="title" onChange={(e) => props.editTask(e, task.id)} value={task.title} />
                    <textarea className="task--description" name="description" onChange={(e) => props.editTask(e, task.id)} value={task.description} />
                    <div  onClick={() => props.deleteTask(task.id)} className="task--delete-button" ></div>
                </div>
            )
        }) 
        : null

    function submitNewTask(formData) {
        props.createNewTask(formData)
        setFormVisible(false)
    }

    return(
        <main>
            <div className={`${formVisible ? "blury" : ""} editor`} >
                <h3>Selected project : {props.currentProject ? props.currentProject.title : ""}</h3>
                <div className="editor--tasksGrid">
                    <div className="tasksGrid--headers">
                        <h4>Title</h4>
                        <h4>Description</h4>
                        <h4>Option</h4>
                    </div>
                    {props.currentProject && <button className="tasksGrid--add-button" onClick={() => setFormVisible(true)}>Create a new note</button>}
                    {!props.currentProject && <div className="taskGrid--select-project">Select a project</div>}
                    {taskElements}
                </div>
            </div>
            {formVisible && <NoteForm quitForm={() => setFormVisible(false)} createNewTask={formData => submitNewTask(formData)} />}
        </main>
    )
}

export default Editor