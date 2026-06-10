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

// Safe ID generator using crypto.randomUUID
export function generateId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2, 6)}`;
}

// Validate a task object has the minimum required shape
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

// ✅ NEW: Type-safe dropdown item for react-native-element-dropdown
// The Dropdown's onChange returns { value: string | number }
// but we know the actual type at each usage site.
export type DropdownItem<T extends string = string> = {
  label: string;
  value: T;
};

// ✅ NEW: Pre-built dropdown data with proper types
export const PRIORITY_DROPDOWN_DATA: DropdownItem<TaskPriority>[] =
  Object.entries(PRIORITY_CONFIG).map(([key, val]) => ({
    label: val.label,
    value: key as TaskPriority,
  }));

export const CATEGORY_DROPDOWN_DATA: DropdownItem<TaskCategory>[] =
  Object.entries(CATEGORY_CONFIG).map(([key, val]) => ({
    label: val.label,
    value: key as TaskCategory,
  }));

export const FILTER_DROPDOWN_DATA: DropdownItem<TaskFilter>[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Done", value: "completed" },
];

// ✅ NEW: Valid Ionicons glyph names used in this app
// This avoids `as any` casts on icon name props
export type AppIconName =
  | "list"
  | "pie-chart"
  | "archive-outline"
  | "settings-sharp"
  | "briefcase"
  | "person"
  | "cart"
  | "heart"
  | "search"
  | "calendar-outline"
  | "add"
  | "add-circle"
  | "checkbox"
  | "square-outline"
  | "close-circle-outline"
  | "checkmark-circle"
  | "ellipse-outline"
  | "trash-outline"
  | "archive-outline"
  | "alarm-outline"
  | "list-outline"
  | "analytics"
  | "alert-circle"
  | "time-outline"
  | "moon"
  | "information-circle"
  | "trash-bin-outline"
  | "chevron-forward"
  | "refresh-outline"
  | "checkmark-done-circle-outline"
  | "search-outline";
