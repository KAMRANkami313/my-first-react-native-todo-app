export type TaskPriority = "low" | "medium" | "high";
export type TaskCategory = "Work" | "Personal" | "Shopping" | "Health";

// NEW: SubTask Type
export type SubTask = {
  id: string;
  title: string;
  completed: boolean;
};

export type Task = {
  id: string;
  title: string;
  notes?: string; // NEW: Description/Notes
  completed: boolean;
  isArchived: boolean; // NEW: Soft-delete
  priority: TaskPriority;
  category: TaskCategory;
  dueDate?: string;
  subTasks: SubTask[];
};

export const PRIORITY_CONFIG = {
  high: { label: "High", color: "#EF4444" },
  medium: { label: "Medium", color: "#FACC15" },
  low: { label: "Low", color: "#22C55E" },
};

export const CATEGORY_CONFIG = {
  Work: { label: "Work", icon: "briefcase", color: "#6366F1" },
  Personal: { label: "Personal", icon: "person", color: "#EC4899" },
  Shopping: { label: "Shopping", icon: "cart", color: "#F59E0B" },
  Health: { label: "Health", icon: "heart", color: "#10B981" },
};
