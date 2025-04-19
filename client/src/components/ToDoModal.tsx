import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ToDo, ToDoModalProps } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useToDoDataContext } from "../context/ToDoDataContextHook";
import "../styles/Modal.css";
import { DEFAULT_CATEGORIES } from "../util/constants";
import DeleteIcon from "@mui/icons-material/Delete";

const determineToDo = (toDo: ToDo | null) => {
  if (toDo) {
    return toDo;
  } else {
    return {
      id: uuidv4(),
      title: "",
      description: "",
      completed: false,
      dueDate: null,
      category: DEFAULT_CATEGORIES[0],
    };
  }
};

export function ToDoModal({ toDo, onClose }: ToDoModalProps) {
  const { addToDo, removeToDo, updateToDo, categories } = useToDoDataContext();
  const [currentToDo, setCurrentToDo] = useState<ToDo>(determineToDo(toDo));
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (toDo === null) {
      addToDo(currentToDo);
    } else {
      updateToDo(currentToDo.id, {
        title: currentToDo.title,
        description: currentToDo.description,
        completed: currentToDo.completed,
        dueDate: currentToDo.dueDate,
      });
    }

    onClose();
  };

  const onDelete = () => {
    if (currentToDo.id) {
      removeToDo(currentToDo.id);
    }
    onClose();
  };

  return createPortal(
    <div className="modal-overlay" onClick={() => onClose()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-close" onClick={() => onClose()}>
          ×
        </div>
        <h2 className="modal-title">Edit Event</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            <span className="label-text">Title</span>
            <input
              type="text"
              value={currentToDo.title}
              onChange={(e) =>
                setCurrentToDo({ ...currentToDo, title: e.target.value })
              }
            />
          </label>
          <label>
            <span className="label-text">Description</span>
            <input
              type="text"
              value={currentToDo.description}
              onChange={(e) =>
                setCurrentToDo({ ...currentToDo, description: e.target.value })
              }
            />
          </label>
          <label>
            <span className="label-text">Due Date</span>
            <input
              type="datetime-local"
              value={
                currentToDo.dueDate
                  ? currentToDo.dueDate.toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                setCurrentToDo({
                  ...currentToDo,
                  dueDate: new Date(e.target.value),
                })
              }
            />
          </label>
          <label>
            <span className="label-text">Category</span>
            <select
              value={currentToDo.category.name}
              onChange={(e) => {
                const selectedCategory = categories.find(
                  (cat) => cat.name === e.target.value
                );

                if (selectedCategory) {
                  setCurrentToDo({
                    ...currentToDo,
                    category: selectedCategory,
                  });
                }
              }}
            >
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <div className="button-container">
            {toDo !== null && (
              <button onClick={onDelete}>
                <DeleteIcon />{" "}
              </button>
            )}
            <button type="submit">{toDo === null ? "Create" : "Update"}</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
