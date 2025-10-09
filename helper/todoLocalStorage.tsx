import * as SecureStore from "expo-secure-store";

// ✅ Save Todos securely
export async function saveTodo(todos: any) {
  try {
    const jsonValue = JSON.stringify(todos);
    await SecureStore.setItemAsync("todo", jsonValue);
    console.log("Todos saved securely ✅");
  } catch (error) {
    console.log("Error saving Todos:", error);
  }
}

// ✅ Get Todos
export async function getTodo() {
  try {
    const jsonValue = await SecureStore.getItemAsync("todo");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.log("Error reading Todos:", error);
    return [];
  }
}

// ✅ Delete specific Todo
export async function deleteTodo(itemToDelete: any) {
  try {
    const existingTodos = await getTodo();

    // Remove all nested arrays + flatten list
    const cleanedTodos = existingTodos.flat().filter((todo: any) => typeof todo === "string");

    // Filter out the item to delete
    const updatedArray = cleanedTodos.filter((todo: any) => todo !== itemToDelete);

    await saveTodo(updatedArray);
    console.log("Todo deleted successfully ✅");
  } catch (e) {
    console.error("Error removing todo", e);
  }
}

// ✅ Optional: clear all Todos
export async function clearAllTodos() {
  try {
    await SecureStore.deleteItemAsync("todo");
    console.log("All todos cleared ✅");
  } catch (e) {
    console.error("Error clearing todos", e);
  }
}
