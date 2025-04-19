import { ToDoListCardProps } from "../types";

export function ToDoListCard({ toDo }: ToDoListCardProps) {
  return (
    <div
      className="card"
      style={{ border: `3px solid ${toDo.category.color}` }}
    >
      <p className="card-title">{toDo.title}</p>
      <p>{toDo.description}</p>
      <p>Due Date: {toDo.dueDate ? toDo.dueDate.toString() : "No due date"}</p>
      <p>Status: {toDo.completed ? "Completed" : "Not Completed"}</p>
    </div>
  );
}
