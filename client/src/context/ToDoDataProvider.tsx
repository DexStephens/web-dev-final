import { ReactNode, useEffect, useState } from "react";
import { ToDoDataContext } from "./ToDoData";
import { Category, ToDo } from "../types";
import { DEFAULT_CATEGORIES, LOCAL_STORAGE_KEY } from "../util/constants";
import { getStorageData } from "../util/localStorage.util";

export function ToDoDataProvider({ children }: { children: ReactNode }) {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  useEffect(() => {
    const parsedData = getStorageData();

    if (parsedData) {
      setToDos(parsedData.toDos);
      setCategories(parsedData.categories);
    }
  }, []);

  useEffect(() => {
    const currentStorage = getStorageData();

    if (
      currentStorage?.categories.length &&
      !(currentStorage.categories.length > categories.length)
    ) {
      const newStorageData = JSON.stringify({
        toDos,
        categories,
      });

      localStorage.setItem(LOCAL_STORAGE_KEY, newStorageData);
    }
  }, [toDos, categories]);

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
