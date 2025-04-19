import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ToDo, ToDoModalProps } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useToDoDataContext } from "../context/ToDoDataContextHook";
import "../styles/ToDoModal.css";

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
    };
  }
};

export function ToDoModal({ toDo, onClose }: ToDoModalProps) {
  const { addToDo, removeToDo, updateToDo } = useToDoDataContext();
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
        <button className="modal-close" onClick={() => onClose()}>
          ×
        </button>
        <h2 className="modal-title">Edit Event</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              value={currentToDo.title}
              onChange={(e) =>
                setCurrentToDo({ ...currentToDo, title: e.target.value })
              }
            />
          </label>
          <label>
            Description
            <input
              type="text"
              value={currentToDo.description}
              onChange={(e) =>
                setCurrentToDo({ ...currentToDo, description: e.target.value })
              }
            />
          </label>
          <label>
            Completed
            <input
              type="checkbox"
              checked={currentToDo.completed}
              onChange={(e) =>
                setCurrentToDo({ ...currentToDo, completed: e.target.checked })
              }
            />
          </label>
          <label>
            Due Date
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
          <button onClick={onDelete}>Remove</button>
          <button type="submit">{toDo === null ? "Create" : "Edit"}</button>
        </form>
      </div>
    </div>,
    document.body
  );
}
