import { UUIDTypes } from "uuid";

export interface ToDoDataContextType {
  toDos: ToDo[];
  setToDos: (toDos: ToDo[]) => void;
  addToDo: (toDo: ToDo) => void;
  removeToDo: (id: string) => void;
  updateToDo: (id: string, updatedToDo: Partial<ToDo>) => void;
}

export interface ToDo {
  id: UUIDTypes;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date | null;
}
