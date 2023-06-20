import React from "react";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import { nanoid } from "nanoid";

function App() {
  const [projects, setProjects] = React.useState(JSON.parse(localStorage.getItem("projects")) || [])
  const [currentProjectId, setCurrentProjectId] = React.useState(projects.find(project => project.selected)?.id || null)

  console.log(projects)

  React.useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
  }, [projects])

  function exportProjectTitle(noteBody, project) {
    const regex = /^.*(?=\n)/g
    const matches = noteBody.match(regex)
    return matches === null ? project.title : matches[0]
  }

  function submitNewTask(newTask, projectId) {
    console.log('insidesubmitnewtask')
    console.log(projectId)
    setProjects(prevProjects => {
      return prevProjects.map(prevProject => {
        return prevProject.id === projectId
          ? {...prevProject, tasks : [...prevProject.tasks, newTask]}
          : prevProject
      })
    })
  }

  function deleteTask(taskId) {
    setProjects(prevProjects => {
      return prevProjects.map(prevProject => {
        return prevProject.id === currentProjectId
        ? {...prevProject, tasks : prevProject.tasks.filter(task => task.id !== taskId)}
        : prevProject
      })
    })
  }

  function editTask(e, taskId) {
    setProjects(prevProjects => {
      return prevProjects.map(prevProject => {
        console.log('here')
        console.log(currentProjectId)
        console.log(prevProject.id)
        return prevProject.id === currentProjectId
        ? {...prevProject, tasks : prevProject.tasks.map(prevTask => prevTask.id === taskId ? {...prevTask, [e.target.name] :e.target.value} : prevTask)}
        : prevProject
      })
    })
  }

  function createNewProject(title) {
    const newProject = {
      title : title || `Project ${projects.length + 1}`,
      body : "",
      id : nanoid(),
      selected : false,
      tasks : []
    }
    setProjects(prevProjects => {
      return [...prevProjects, newProject]
    })
  }

  function selectProject(projectId) {
    setProjects(prevProjects => {
      return prevProjects.map(prevProject => {
        return prevProject.id === projectId
          ? {...prevProject, selected : true}
          : {...prevProject, selected : false}
      })
    })
    setCurrentProjectId(projectId)
  }

  /* function editNote(e, noteId) {
    setNotes(prevNotes => {
      return prevNotes.map(prevNote => {
        return prevNote.id === noteId
          ? {...prevNote, body : e.target.value, title : exportNoteTitle(e.target.value, prevNote)}
          : prevNote
      })
    })
  } */

  function deleteProject(projectId) {
    return setProjects(prevProjects => {
      return prevProjects.filter(prevProject => prevProject.id !== projectId)
    })
  }

  return (
    <div className="app">
      <Sidebar createNewProject={createNewProject} selectProject={selectProject} deleteProject={deleteProject} projects={projects} />
      <Editor editTask={editTask} deleteTask={deleteTask} submitNewTask={submitNewTask} projects={projects} currentProjectId={currentProjectId} />
    </div>
  );
}

export default App;
