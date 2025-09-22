import * as SecureStore from "expo-secure-store";

export async function saveToken(token: string) {
  try {
    await SecureStore.setItemAsync("token", token);
  } catch (e) {
    console.error("Error saving token", e);
  }
}

export async function getToken() {
  try {
    return await SecureStore.getItemAsync("token");
  } catch (e) {
    console.error("Error getting token", e);
    return null;
  }
}

export async function removeToken(token:string) {
  try {
    await SecureStore.deleteItemAsync("token");
  } catch (e) {
    console.error("Error removing token", e);
  }
}
