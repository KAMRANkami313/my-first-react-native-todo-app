const tintColorLight = "#6366F1";
const tintColorDark = "#6366F1";

export const Colors = {
  light: {
    text: "#1E293B",
    background: "#F8FAFC",
    tint: tintColorLight,
    icon: "#64748B",
    tabIconDefault: "#64748B",
    tabIconSelected: tintColorLight,
    card: "#FFFFFF",
    border: "#E2E8F0",
    cardElevated: "#FFFFFF",
    textSecondary: "#64748B",
    textMuted: "#94A3B8",
    accent: "#6366F1",
    accentSubtle: "rgba(99, 102, 241, 0.08)",
    danger: "#EF4444",
    dangerSubtle: "rgba(239, 68, 68, 0.08)",
    success: "#22C55E",
    successSubtle: "rgba(34, 197, 94, 0.08)",
    warning: "#FACC15",
    inputBackground: "#F1F5F9",
    overlay: "rgba(0,0,0,0.5)",
    shadow: "rgba(0,0,0,0.1)",
  },
  dark: {
    text: "#F1F5F9",
    background: "#0F172A",
    tint: tintColorDark,
    icon: "#94A3B8",
    tabIconDefault: "#94A3B8",
    tabIconSelected: tintColorDark,
    card: "#1E293B",
    border: "#334155",
    cardElevated: "#1E293B",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",
    accent: "#818CF8",
    accentSubtle: "rgba(129, 140, 248, 0.12)",
    danger: "#F87171",
    dangerSubtle: "rgba(248, 113, 113, 0.12)",
    success: "#4ADE80",
    successSubtle: "rgba(74, 222, 128, 0.12)",
    warning: "#FDE047",
    inputBackground: "#0F172A",
    overlay: "rgba(0,0,0,0.85)",
    shadow: "rgba(0,0,0,0.3)",
  },
};

// ✅ NEW: Gradient color pairs for priority strips and buttons
export const Gradients = {
  priority: {
    high: ["#EF4444", "#DC2626"] as const,
    medium: ["#FACC15", "#F59E0B"] as const,
    low: ["#22C55E", "#16A34A"] as const,
  },
  accent: ["#6366F1", "#8B5CF6"] as const,
  success: ["#22C55E", "#10B981"] as const,
  danger: ["#EF4444", "#DC2626"] as const,
};

// ✅ NEW: Consistent spacing and sizing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
} as const;
