import { ToDo, Category } from "../types";
import { LOCAL_STORAGE_KEY } from "./constants";

export function getStorageData() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);

  const parsedData = data
    ? (JSON.parse(data) as { toDos: ToDo[]; categories: Category[] })
    : null;

  return parsedData;
}
