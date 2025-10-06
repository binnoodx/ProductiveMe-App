import * as SecureStore from "expo-secure-store";

export async function saveTodo(todo: string) {
  try {
    await SecureStore.setItemAsync("todo", todo);
  } catch (e) {
    console.error("Error saving todo", e);
  }
}

export async function getTodo() {
  try {
    return await SecureStore.getItemAsync("todo");
  } catch (e) {
    console.error("Error getting todo", e);
    return null;
  }
}

export async function deleteTodo(todo:string) {
  try {
    await SecureStore.deleteItemAsync("todo");
  } catch (e) {
    console.error("Error removing todo", e);
  }
}
