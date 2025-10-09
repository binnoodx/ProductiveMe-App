import { getTodo, saveTodo } from "@/helper/todoLocalStorage";

export async function cleanTodos() {
  const todos = await getTodo();

  if (!Array.isArray(todos)) return;

  // 🧹 Flatten nested arrays and remove invalid/empty items
  const cleaned = todos.flat().filter(todo => typeof todo === "string" && todo.trim() !== "");

  await saveTodo(cleaned);

  console.log("🧼 Cleaned todos:", cleaned);
}
