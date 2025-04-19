import { useState } from "react";
import "./App.css";
import { ToDoList } from "./components/ToDoList";
import { ToDoModal } from "./components/ToDoModal";
import { ToDo } from "./types";
import { CategoryModal } from "./components/CategoryModal";
import AddIcon from "@mui/icons-material/Add";

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
        {/* Header */}
        <section className="header">
          <h1 className="header-title">To-Do App</h1>
          <div className="toolbar">
            <button onClick={() => setOpenToDoModal(true)}>
              <AddIcon /> To-Do
            </button>
            <button onClick={() => setOpenCategoryModal(true)}>
              <AddIcon /> Category
            </button>
          </div>
        </section>
        <ToDoList setSelectedToDo={setSelectedToDo} />
      </div>
    </>
  );
}

export default App;

//NEXT: add in notifications, more filter options
