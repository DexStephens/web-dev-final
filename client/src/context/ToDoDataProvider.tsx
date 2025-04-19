import { ReactNode, useState } from "react";
import { ToDoDataContext } from "./ToDoData";
import { ToDo } from "../types";

// export interface ToDoDataContextType {
//   addToDo: (toDo: ToDo) => void;
//   removeToDo: (id: string) => void;
//   updateToDo: (id: string, updatedToDo: Partial<ToDo>) => void;
// }

export function ToDoDataProvider({ children }: { children: ReactNode }) {
  const [toDos, setToDos] = useState<ToDo[]>([]);

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

  return (
    <ToDoDataContext
      value={{
        toDos,
        setToDos,
        addToDo,
        removeToDo,
        updateToDo,
      }}
    >
      {children}
    </ToDoDataContext>
  );
}
