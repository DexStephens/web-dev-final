export interface ToDoDataContextType {
  toDos: ToDo[];
  setToDos: (toDos: ToDo[]) => void;
  addToDo: (toDo: ToDo) => void;
  removeToDo: (id: string) => void;
  updateToDo: (id: string, updatedToDo: Partial<ToDo>) => void;
}

export interface ToDo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date | null;
}

export interface ToDoModalProps {
  toDo: ToDo | null;
  onClose: () => void;
}
