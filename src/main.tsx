import { createRoot } from "react-dom/client";
import { App } from "@/app/App";

// Расскажи вкратце о технологиях проекта
// Проект сделан с помощью:
// 1) Архитектуры FSD
// 2) RTK Query
// 3) shadcn/ui в качесвте ui кита

createRoot(document.getElementById("root")!).render(<App />);
