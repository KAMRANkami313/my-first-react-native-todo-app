export type TaskPriority = "low" | "medium" | "high";
export type TaskCategory = "Work" | "Personal" | "Shopping" | "Health";
export type TaskFilter = "all" | "active" | "completed";

// SubTask Type
export type SubTask = {
  id: string;
  title: string;
  completed: boolean;
};

export type Task = {
  id: string;
  title: string;
  notes?: string;
  completed: boolean;
  isArchived: boolean;
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

// ✅ NEW: Safe ID generator using crypto.randomUUID
export function generateId(): string {
  // crypto.randomUUID() is available in React Native Hermes engine (RN 0.71+)
  // Falls back to timestamp + random for older environments
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  // Fallback: timestamp + random 4-digit hex (extremely low collision chance)
  return `${Date.now()}-${Math.random().toString(16).slice(2, 6)}`;
}

// ✅ NEW: Validate a task object has the minimum required shape
export function isValidTask(obj: unknown): obj is Task {
  if (typeof obj !== "object" || obj === null) return false;
  const t = obj as Record<string, unknown>;
  return (
    typeof t.id === "string" &&
    typeof t.title === "string" &&
    typeof t.completed === "boolean" &&
    typeof t.isArchived === "boolean" &&
    (t.priority === "low" ||
      t.priority === "medium" ||
      t.priority === "high") &&
    (t.category === "Work" ||
      t.category === "Personal" ||
      t.category === "Shopping" ||
      t.category === "Health") &&
    Array.isArray(t.subTasks)
  );
}
