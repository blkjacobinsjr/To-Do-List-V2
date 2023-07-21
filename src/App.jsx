import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { useState, useEffect } from "react";
//import different components created

const LOCAL_STORAGE_KEY = "todo:savedTasks";
const LOCAL_STORAGE_NAME_KEY = "todo:savedName";

function App() {
  //initialize state for task list and create a new uuid using the crypto library to generate unique ids
  const [tasks, setTasks] = useState([]);

  function loadSavedTasks() {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedName = localStorage.getItem(LOCAL_STORAGE_NAME_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedName) {
      setName(savedName);
    }
  }

  function handleNameBlur(event) {
    saveName(event.target.value);
  }

  function handleNameKeyDown(event) {
    if (event.key === "Enter") {
      saveName(event.target.value);
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  const [name, setName] = useState("");
  function saveName(newName) {
    setName(newName);
    localStorage.setItem(LOCAL_STORAGE_NAME_KEY, newName);
  }

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
        isCompleted: false,
      },
    ]);
  }

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  const editTaskTitle = (id, title) => {
      console.log(id);
      console.log(title);
      const payload = tasks.map(element => {
        if(element.id == id){
          return {...element, title:title}
        }else{
          return {...element}
        }
      })
      setTasksAndSave(payload)
  }

  return (
    <>
      <Header onAddTask={addTask} onSaveName={saveName} />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        editTaskTitle={editTaskTitle}
      />
    </>
  );
}

export default App;
