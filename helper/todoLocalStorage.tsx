import * as SecureStore from "expo-secure-store";

export async function saveTodo(Todos:any) {
  try {
    const jsonValue = JSON.stringify(Todos);
    await SecureStore.setItemAsync("todo", jsonValue);
    console.log('Todos saved securely ✅');
  } catch (error) {
    console.log('Error saving Todos:', error);
  }
}

export async function getTodo({key}:any) {
  try {
    const jsonValue = await SecureStore.getItemAsync("todo");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.log('Error reading Todos:', error);
    return [];
  }
};

export async function deleteTodo(todo:string) {
  try {
    await SecureStore.deleteItemAsync("todo");
  } catch (e) {
    console.error("Error removing todo", e);
  }
}
