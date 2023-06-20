import React from "react";
import { nanoid } from "nanoid";
import "./noteForm.css"

function NoteForm(props) {
    const [formData, setFormData] = React.useState({
        title : "",
        description : "",
        id : nanoid()
    })

    function handleChange(e) {
        setFormData(prevFormData => {
            return ({
                ...prevFormData,
                [e.target.name] : e.target.value
            }) 
        })
    }

    return(
        <div className="formContainer">
            <form className="noteForm">
            <div onClick={props.quitForm} id="closeForm">x</div>

            <h2>Enter your task's details</h2>

            <div class="formFields">
                <div class="formField">
                    <label for="title">Task title :</label>
                    <input name="title" onChange={handleChange} type="text" id="title" placeholder=" " required />
                    <span></span>
                </div>
                <div class="formField">
                    <label for="description">Description :</label>
                    <input name="description" onChange={handleChange} type="text" id="description" placeholder=" " required />
                    <span></span>
                </div>
                {/* <div class="formField">
                    <label for="date">Task due date :</label>
                    <input type="date" id="dueDate" placeholder=" " required />
                    <span></span>
                </div>
                <div class="formField">
                    <label for="category">Task category :</label>
                    <input type="text" id="category" placeholder=" " required />
                    <span></span>
                </div>
                <div class="formField">
                <label for="state">Task state :</label>
                <select name="state" id="state">
                    <option value="to-do">to-do</option>
                    <option value="in progress">in progress</option>
                    <option value="done">done</option>
                </select>
            </div> */}
            </div>

            <button onClick={() => props.submitNewTask(formData, (props.currentProjectId))} type="button" id="submit">Add to the list</button>
            {/* <button type="button" id="editMode" disabled>Submit changes</button> */}
        </form>
        </div>
    )
}

export default NoteForm