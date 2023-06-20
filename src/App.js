import React from "react";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import { nanoid } from "nanoid";

function App() {
  const [projects, setProjects] = React.useState(JSON.parse(localStorage.getItem("projects")) || [])
  const [currentProject, setCurrentProject] = React.useState(findCurrentProject())

  React.useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
    setCurrentProject(findCurrentProject())
  }, [projects])


  function findCurrentProject() {
    return projects.find(project => project.selected) || null
  }

  function createNewProject(title) {
    const newProject = {
      title : title || `Project ${projects.length + 1}`,
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
  }

  function deleteProject(projectId) {
    setProjects(prevProjects => {
      return prevProjects.filter(prevProject => prevProject.id !== projectId)
    })
  }

  function createNewTask(newTask) {
    setProjects(prevProjects => {
      return prevProjects.map(prevProject => {
        return prevProject.id === currentProject.id
          ? {...prevProject, tasks : [...prevProject.tasks, newTask]}
          : prevProject
      })
    })
  }

  function deleteTask(taskId) {
    setProjects(prevProjects => {
      return prevProjects.map(prevProject => {
        return prevProject.id === currentProject.id
        ? {...prevProject, tasks : prevProject.tasks.filter(task => task.id !== taskId)}
        : prevProject
      })
    })
  }

  function editTask(e, taskId) {
    const editedFieldContent = e.target.value
    setProjects(prevProjects => {
      return prevProjects.map(prevProject => {
        return prevProject.id === currentProject.id
        ? {...prevProject, tasks : prevProject.tasks.map(prevTask => prevTask.id === taskId ? {...prevTask, [e.target.name] : editedFieldContent} : prevTask)}
        : prevProject
      })
    })
  }

  return (
    <div className="app">
      <Sidebar createNewProject={createNewProject} selectProject={selectProject} deleteProject={deleteProject} projects={projects} />
      <Editor createNewTask={createNewTask} editTask={editTask} deleteTask={deleteTask} currentProject={currentProject} />
    </div>
  );
}

export default App;
