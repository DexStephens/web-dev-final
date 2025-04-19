import { useState } from "react";
import "./App.css";
import { ToDoList } from "./components/ToDoList";
import { ToDoModal } from "./components/ToDoModal";
import { ToDo } from "./types";
import { CategoryModal } from "./components/CategoryModal";

function App() {
  const [openToDoModal, setOpenToDoModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
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
      {openCategoryModal && (
        <CategoryModal onClose={() => setOpenCategoryModal(false)} />
      )}
      <div>
        <h1>To-Do App</h1>
        <button onClick={() => setOpenToDoModal(true)}>Add To-Do</button>
        <button onClick={() => setOpenCategoryModal(true)}>Add Category</button>
        <ToDoList setSelectedToDo={setSelectedToDo} />
      </div>
    </>
  );
}

export default App;

//NEXT: Make the app pretty and responsive
//NEXT: add in notifications, more filter options
//NEXT: work with local storage
