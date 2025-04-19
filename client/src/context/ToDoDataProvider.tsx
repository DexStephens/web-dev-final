import { ReactNode, useState } from "react";
import { ToDoDataContext } from "./ToDoData";
import { Category, ToDo } from "../types";
import { DEFAULT_CATEGORIES } from "../util/constants";

export function ToDoDataProvider({ children }: { children: ReactNode }) {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  const addToDo = (toDo: ToDo) => {
    setToDos((prevToDos) => [...prevToDos, toDo]);
  };

  const removeToDo = (id: string) => {
    setToDos((prevToDos) => prevToDos.filter((toDo) => toDo.id !== id));
  };

  const updateToDo = (id: string, updatedToDo: Partial<ToDo>) => {
    setToDos((prevToDos) =>
      prevToDos.map((toDo) =>
        toDo.id === id ? { ...toDo, ...updatedToDo } : toDo
      )
    );
  };

  const addCategory = (category: Category) => {
    if (!categories.some((cat) => cat.name === category.name)) {
      setCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  return (
    <ToDoDataContext
      value={{
        toDos,
        setToDos,
        addToDo,
        removeToDo,
        updateToDo,
        categories,
        addCategory,
      }}
    >
      {children}
    </ToDoDataContext>
  );
}
