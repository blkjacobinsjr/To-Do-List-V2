import { Header } from "./components/Header"
import { Tasks } from "./components/Tasks"
import { useState, useEffect } from "react"
//import different components created

const LOCAL_STORAGE_KEY = "todo:savedTasks"

function App() {
  //initialize state for task list and create a new uuid using the crypto library to generate unique ids
  const [tasks, setTasks] = useState([]);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(saved);
    if(saved) {
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => { 
  loadSavedTasks
}, [])
  
  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function addTask(taskTitle) {
    setTasksAndSave([
      ...tasks,
    {
      id: crypto.randomUUID(),
      title: taskTitle,
      isCompleted:false
    }
    ]);
  }



  function deleteTaskById(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) {
      return {
        ...task,
        isCompleted: !task.isCompleted
      }
    }
    return task;
  });
  setTasks(newTasks);
}
  return (
    <>
    <Header onAddTask={addTask} />
    <Tasks 
    tasks={tasks}
    onDelete={deleteTaskById}
    onComplete={toggleTaskCompletedById}
    />
    </>
  )
}

export default App