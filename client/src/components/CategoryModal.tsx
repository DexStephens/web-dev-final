import { useEffect, useState } from "react";
import { useToDoDataContext } from "../context/ToDoDataContextHook";
import "../styles/Modal.css";
import { Category, ModalProps } from "../types";
import { createPortal } from "react-dom";

export function CategoryModal({ onClose }: ModalProps) {
  const { addCategory } = useToDoDataContext();
  const [newCategory, setNewCategory] = useState<Category>({
    color: "#0dead0",
    name: "",
  });
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

    if (newCategory.name.trim() === "") {
      return;
    }
    addCategory(newCategory);

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
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
            />
          </label>
          <label>
            Color
            <input
              type="color"
              value={newCategory.color}
              onChange={(e) =>
                setNewCategory({ ...newCategory, color: e.target.value })
              }
            />
          </label>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>,
    document.body
  );
}
