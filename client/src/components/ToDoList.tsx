import { useMemo, useState } from "react";
import { useToDoDataContext } from "../context/ToDoDataContextHook";
import { ToDo, ToDoListFilter, ToDoListProps } from "../types";

//CHATGPT USE: Looked up how to implement a multiple select dropdown in React

export function ToDoList({ setSelectedToDo }: ToDoListProps) {
  const { toDos, categories } = useToDoDataContext();
  const [filter, setFilter] = useState<ToDoListFilter>({
    categories: [],
  });

  const handleCategorySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    const selectedCategories = categories.filter((category) =>
      selectedOptions.includes(category.name)
    );
    setFilter({ ...filter, categories: selectedCategories });
  };

  const filteredToDos = useMemo(() => {
    if (filter.categories.length === 0) {
      return toDos;
    }
    return toDos.filter((toDo) =>
      filter.categories.some((category) => category.name === toDo.category.name)
    );
  }, [filter, toDos]);

  return (
    <div>
      <p>Filters</p>
      <select
        multiple
        value={filter.categories.map((cat) => cat.name)}
        onChange={handleCategorySelection}
      >
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <ul>
        {filteredToDos.map((toDo: ToDo) => (
          <li
            key={toDo.title}
            onClick={() => setSelectedToDo(toDo)}
            style={{ border: `1px solid ${toDo.category.color}` }}
          >
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
