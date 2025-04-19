export interface ToDoDataContextType {
  toDos: ToDo[];
  setToDos: (toDos: ToDo[]) => void;
  addToDo: (toDo: ToDo) => void;
  removeToDo: (id: string) => void;
  updateToDo: (id: string, updatedToDo: Partial<ToDo>) => void;
  categories: Category[];
  addCategory: (category: Category) => void;
}

export interface Category {
  color: string;
  name: string;
}

export interface ToDo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date | null;
  category: Category;
}

export interface ModalProps {
  onClose: () => void;
}

export interface ToDoModalProps extends ModalProps {
  toDo: ToDo | null;
}

export interface ToDoListProps {
  setSelectedToDo: (toDo: ToDo) => void;
}

export interface ToDoListFilter {
  categories: Category[];
}
