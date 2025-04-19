import { use } from "react";
import { ToDoDataContextType } from "../types";
import { ToDoDataContext } from "./ToDoData";

export function useToDoDataContext(): ToDoDataContextType {
  const context = use(ToDoDataContext);

  if (!context) {
    throw new Error(
      "useToDoDataContext must be used within a ToDoDataContextProvider"
    );
  }

  return context;
}
