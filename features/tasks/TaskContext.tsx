import { loadTasks, saveTasks } from "@/services/storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  SubTask,
  Task,
  TaskCategory,
  TaskFilter,
  TaskPriority,
  generateId,
} from "./task.types";

interface TaskStats {
  total: number;
  completed: number;
  active: number;
  progress: number;
  highPriorityPending: number;
  medPriorityPending: number;
}

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];

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
  filter: TaskFilter;
  setFilter: (filter: TaskFilter) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  stats: TaskStats;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks().then(setTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // ✅ FIX: Use generateId() instead of Date.now().toString()
  const addTask = useCallback(
    (
      title: string,
      priority: TaskPriority,
      category: TaskCategory,
      dueDate?: string,
    ) => {
      const newTask: Task = {
        id: generateId(),
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

  const archiveTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isArchived: true } : t)),
    );
  }, []);

  const unarchiveTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isArchived: false } : t)),
    );
  }, []);

  // ✅ FIX: Use generateId() for subtask IDs too
  const addSubTask = useCallback((taskId: string, title: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const newSub: SubTask = {
            id: generateId(),
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

  const archivedTasks = useMemo(() => {
    return tasks.filter((t) => t.isArchived);
  }, [tasks]);

  // ✅ FIX: Properly typed stats instead of `any`
  const stats = useMemo((): TaskStats => {
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
        archivedTasks,
        addTask,
        deleteTask,
        toggleTask,
        updateTask,
        addSubTask,
        toggleSubTask,
        deleteSubTask,
        archiveTask,
        unarchiveTask,
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
  if (!context)
    throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};
