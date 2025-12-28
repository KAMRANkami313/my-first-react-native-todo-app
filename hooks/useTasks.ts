import { useTaskContext } from "../features/tasks/TaskContext";

export function useTasks() {
  const context = useTaskContext();

  return {
    // ✅ DATA
    tasks: context.filteredTasks, // Active (filtered + non-archived)
    allTasks: context.tasks, // All tasks (including archived)
    archivedTasks: context.archivedTasks, // ✅ NEW

    // ✅ TASK ACTIONS
    addTask: context.addTask,
    deleteTask: context.deleteTask, // Permanent delete
    archiveTask: context.archiveTask,
    unarchiveTask: context.unarchiveTask, // ✅ NEW
    toggleTask: context.toggleTask,
    updateTask: context.updateTask,

    // ✅ SUBTASK ACTIONS
    addSubTask: context.addSubTask,
    toggleSubTask: context.toggleSubTask,
    deleteSubTask: context.deleteSubTask,

    // ✅ GLOBAL UI STATE
    search: context.search,
    setSearch: context.setSearch,
    filter: context.filter,
    setFilter: context.setFilter,
    editingTask: context.editingTask,
    startEdit: context.setEditingTask,
    cancelEdit: () => context.setEditingTask(null),

    // ✅ STATS
    stats: context.stats,
  };
}
