import { createRoot } from "react-dom/client";
import { App } from "@/app/App";

// Расскажи вкратце о технологиях проекта
// Проект сделан с помощью:
// 1)Использование архитектуру FSD
// 2)RTK Query
// 3)Для стилизации решил использовать shadcnui, который на tailwind работает. Что бы потратить меньше времени на стилизацию

createRoot(document.getElementById("root")!).render(<App />);
