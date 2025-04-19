import { createContext } from "react";
import { ToDoDataContextType } from "../types";

export const ToDoDataContext = createContext<ToDoDataContextType | null>(null);
