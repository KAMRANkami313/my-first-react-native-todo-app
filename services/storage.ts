import { Task, isValidTask } from "@/features/tasks/task.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "TASKS_APP_DATA";

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

    // ✅ FIX: Validate each task object instead of just checking Array.isArray
    if (!Array.isArray(parsed)) return [];

    // Filter out corrupted/malformed task objects
    const validTasks = parsed.filter((item: unknown) => isValidTask(item));

    // If some tasks were filtered out, save the cleaned data back
    if (validTasks.length !== parsed.length) {
      console.warn(
        `Storage: Removed ${parsed.length - validTasks.length} invalid task(s) from storage`,
      );
      await saveTasks(validTasks);
    }

    return validTasks;
  } catch (e) {
    console.error("Failed to load tasks from storage:", e);
    return [];
  }
}
