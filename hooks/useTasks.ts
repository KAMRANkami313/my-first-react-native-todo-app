import { useTaskContext } from "@/features/tasks/TaskContext";
import { useCallback } from "react";

export function useTasks() {
  const context = useTaskContext();

  const cancelEdit = useCallback(
    () => context.setEditingTask(null),
    [context.setEditingTask],
  );

  return {
    // Data
    tasks: context.filteredTasks,
    allTasks: context.tasks,
    archivedTasks: context.archivedTasks,

    // Task actions
    addTask: context.addTask,
    deleteTask: context.deleteTask,
    archiveTask: context.archiveTask,
    unarchiveTask: context.unarchiveTask,
    toggleTask: context.toggleTask,
    updateTask: context.updateTask,

    // Subtask actions
    addSubTask: context.addSubTask,
    toggleSubTask: context.toggleSubTask,
    deleteSubTask: context.deleteSubTask,

    // Global UI state
    search: context.search,
    setSearch: context.setSearch,
    filter: context.filter,
    setFilter: context.setFilter,
    editingTask: context.editingTask,
    startEdit: context.setEditingTask,
    cancelEdit,

    // Stats
    stats: context.stats,
  };
}
