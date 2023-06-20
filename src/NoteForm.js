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
        <div className="form-container">
            <form className="task-form">
                <div onClick={props.quitForm} id="task-form--close">x</div>
                <h2>Enter your task's details</h2>
                <div class="task-form--formFields">
                    <div class="formField">
                        <label htmlFor="title">Task title :</label>
                        <input name="title" onChange={handleChange} type="text" id="title" placeholder=" " required />
                        <span></span>
                    </div>
                    <div class="formField">
                        <label htmlFor="description">Description :</label>
                        <input name="description" onChange={handleChange} type="text" id="description" placeholder=" " required />
                        <span></span>
                    </div>
                </div>
                <button onClick={() => props.createNewTask(formData)} type="button" id="task-form--submit">Add to the list</button>
            </form>
        </div>
    )
}

export default NoteForm