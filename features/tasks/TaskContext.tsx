import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { loadTasks, saveTasks } from "../../services/storage";
import { SubTask, Task, TaskCategory, TaskPriority } from "./task.types";

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];

  // ✅ NEW
  archivedTasks: Task[];
  unarchiveTask: (id: string) => void;

  addTask: (
    title: string,
    priority: TaskPriority,
    category: TaskCategory,
    dueDate?: string,
  ) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  addSubTask: (taskId: string, title: string) => void;
  toggleSubTask: (taskId: string, subTaskId: string) => void;
  deleteSubTask: (taskId: string, subTaskId: string) => void;

  archiveTask: (id: string) => void;

  search: string;
  setSearch: (text: string) => void;
  filter: string;
  setFilter: (filter: any) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  stats: any;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks().then(setTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback(
    (
      title: string,
      priority: TaskPriority,
      category: TaskCategory,
      dueDate?: string,
    ) => {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        completed: false,
        priority,
        category,
        dueDate,
        subTasks: [],
        isArchived: false,
      };
      setTasks((prev) => [newTask, ...prev]);
    },
    [],
  );

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
    setEditingTask(null);
  }, []);

  // ✅ ARCHIVE
  const archiveTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isArchived: true } : t)),
    );
  }, []);

  // ✅ UNARCHIVE
  const unarchiveTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isArchived: false } : t)),
    );
  }, []);

  const addSubTask = useCallback((taskId: string, title: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const newSub: SubTask = {
            id: Date.now().toString(),
            title,
            completed: false,
          };
          return {
            ...task,
            subTasks: [...(task.subTasks || []), newSub],
          };
        }
        return task;
      }),
    );
  }, []);

  const toggleSubTask = useCallback((taskId: string, subTaskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            subTasks: task.subTasks.map((s) =>
              s.id === subTaskId ? { ...s, completed: !s.completed } : s,
            ),
          };
        }
        return task;
      }),
    );
  }, []);

  const deleteSubTask = useCallback((taskId: string, subTaskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            subTasks: task.subTasks.filter((s) => s.id !== subTaskId),
          };
        }
        return task;
      }),
    );
  }, []);

  // ✅ FILTERED TASKS (HIDE ARCHIVED)
  const filteredTasks = useMemo(() => {
    const priorityWeight = { high: 3, medium: 2, low: 1 };

    return tasks
      .filter((t) => {
        if (t.isArchived) return false;

        const matchFilter =
          filter === "all" ||
          (filter === "active" && !t.completed) ||
          (filter === "completed" && t.completed);

        const matchSearch = t.title
          .toLowerCase()
          .includes(search.toLowerCase());

        return matchFilter && matchSearch;
      })
      .sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
  }, [tasks, filter, search]);

  // ✅ ARCHIVED LIST
  const archivedTasks = useMemo(() => {
    return tasks.filter((t) => t.isArchived);
  }, [tasks]);

  const stats = useMemo(() => {
    const activeTasks = tasks.filter((t) => !t.isArchived);

    const total = activeTasks.length;
    const completed = activeTasks.filter((t) => t.completed).length;

    return {
      total,
      completed,
      active: total - completed,
      progress: total === 0 ? 0 : Math.round((completed / total) * 100),
      highPriorityPending: activeTasks.filter(
        (t) => t.priority === "high" && !t.completed,
      ).length,
      medPriorityPending: activeTasks.filter(
        (t) => t.priority === "medium" && !t.completed,
      ).length,
    };
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        archivedTasks, // ✅ NEW
        addTask,
        deleteTask,
        toggleTask,
        updateTask,
        addSubTask,
        toggleSubTask,
        deleteSubTask,
        archiveTask,
        unarchiveTask, // ✅ NEW
        search,
        setSearch,
        filter,
        setFilter,
        editingTask,
        setEditingTask,
        stats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext error");
  return context;
};
