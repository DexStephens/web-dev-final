import { useToDoDataContext } from "../context/ToDoDataContextHook";
import { ToDo, ToDoListProps } from "../types";

export function ToDoList({ setSelectedToDo }: ToDoListProps) {
  const { toDos } = useToDoDataContext();
  return (
    <div>
      <ul>
        {toDos.map((toDo: ToDo) => (
          <li key={toDo.title} onClick={() => setSelectedToDo(toDo)}>
            <h3>{toDo.title}</h3>
            <p>{toDo.description}</p>
            <p>
              Due Date: {toDo.dueDate ? toDo.dueDate.toString() : "No due date"}
            </p>
            <p>Status: {toDo.completed ? "Completed" : "Not Completed"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
