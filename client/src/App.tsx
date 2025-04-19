import { useState } from "react";
import "./App.css";
import { ToDoList } from "./components/ToDoList";
import { ToDoModal } from "./components/ToDoModal";
import { ToDo } from "./types";

function App() {
  const [openToDoModal, setOpenToDoModal] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState<ToDo | null>(null);

  const onToDoModalClose = () => {
    setSelectedToDo(null);
    setOpenToDoModal(false);
  };
  return (
    <>
      {(openToDoModal || selectedToDo) && (
        <ToDoModal toDo={selectedToDo} onClose={onToDoModalClose} />
      )}
      <div>
        <h1>To-Do App</h1>
        <button onClick={() => setOpenToDoModal(true)}>Add To-Do</button>
        <ToDoList setSelectedToDo={setSelectedToDo} />
      </div>
    </>
  );
}

export default App;

// NEXT: Add in categories, ability to create categories, assign to-dos to categories, add in filters for due date, categories
//NEXT: Make the app pretty and responsive
//NEXT: add in notifications
//NEXT: work with local storage
