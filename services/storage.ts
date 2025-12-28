import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../features/tasks/task.types";

const KEY = "TASKS_APP_DATA"; // More specific key

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save tasks to storage:", e);
  }
}

export async function loadTasks(): Promise<Task[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(KEY);
    if (!jsonValue) return [];

    const parsed = JSON.parse(jsonValue);
    // Basic validation: ensure we returned an array
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to load tasks from storage:", e);
    return [];
  }
}
