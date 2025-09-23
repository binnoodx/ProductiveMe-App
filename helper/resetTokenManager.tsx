import * as SecureStore from "expo-secure-store";

const RESET_TOKEN_KEY = "resetToken";

export async function saveResetToken(resetToken: string) {
  try {
    await SecureStore.setItemAsync(RESET_TOKEN_KEY, resetToken);
  } catch (e) {
    console.error("Error saving token", e);
  }
}

export async function getResetToken() {
  try {
    return await SecureStore.getItemAsync(RESET_TOKEN_KEY);
  } catch (e) {
    console.error("Error getting token", e);
    return null;
  }
}

export async function removeResetToken() {
  try {
    await SecureStore.deleteItemAsync(RESET_TOKEN_KEY);
  } catch (e) {
    console.error("Error removing token", e);
  }
}
