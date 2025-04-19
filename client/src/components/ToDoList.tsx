import { useMemo, useState } from "react";
import { useToDoDataContext } from "../context/ToDoDataContextHook";
import { Category, ToDo, ToDoListFilter, ToDoListProps } from "../types";
import "../styles/ToDoList.css";
import { ToDoListCard } from "./ToDoListCard";

//CHATGPT USE: Looked up how to implement a multiple select dropdown in React

export function ToDoList({ setSelectedToDo }: ToDoListProps) {
  const { toDos, categories } = useToDoDataContext();
  const [filter, setFilter] = useState<ToDoListFilter>({
    categories: [],
  });

  const handleCategorySelection = (category: Category) => {
    if (filter.categories.includes(category)) {
      setFilter({
        ...filter,
        categories: filter.categories.filter(
          (cat) => cat.name !== category.name
        ),
      });
    } else {
      setFilter({ ...filter, categories: [...filter.categories, category] });
    }
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
      <div className="filter-container">
        <div className="pill-container">
          {categories.map((category) => {
            return (
              <div
                key={category.name}
                className="category"
                style={{
                  backgroundColor: filter.categories.includes(category)
                    ? "#1D8EDD"
                    : "#51b0f6",
                }}
                onClick={() => handleCategorySelection(category)}
              >
                {category.name}
              </div>
            );
          })}
        </div>
      </div>
      <ul className="card-list">
        {filteredToDos.map((toDo: ToDo) => (
          <li key={toDo.title} onClick={() => setSelectedToDo(toDo)}>
            <ToDoListCard toDo={toDo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
