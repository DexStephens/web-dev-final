import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToDoDataProvider } from "./context/ToDoDataProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToDoDataProvider>
      <App />
    </ToDoDataProvider>
  </StrictMode>
);
