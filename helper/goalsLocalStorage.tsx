import * as SecureStore from "expo-secure-store";

// ✅ Save Goals securely
export async function saveGoal(Goals: any) {
  try {
    const jsonValue = JSON.stringify(Goals);
    await SecureStore.setItemAsync("goal", jsonValue);
    console.log("Goals saved securely ✅");
  } catch (error) {
    console.log("Error saving Goals:", error);
  }
}

// ✅ Get Goals
export async function getGoals() {
  try {
    const jsonValue = await SecureStore.getItemAsync("goal");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.log("Error reading Goals:", error);
    return [];
  }
}

// ✅ Delete specific Goal
export async function deleteGoals(itemToDelete: any) {
  try {
    const existingGoals = await getGoals();

    // Remove all nested arrays + flatten list
    const cleanedGoals = existingGoals.flat().filter((goal: any) => typeof goal === "string");

    // Filter out the item to delete
    const updatedArray = cleanedGoals.filter((goal: any) => goal !== itemToDelete);

    await saveGoal(updatedArray);
    console.log("Goal deleted successfully ✅");
  } catch (e) {
    console.error("Error removing goal", e);
  }
}


