import { ThemedText } from "@/components/themed-text";
import {
  AppIconName,
  CATEGORY_CONFIG,
  PRIORITY_CONFIG,
  Task,
} from "@/features/tasks/task.types";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useTasks } from "@/hooks/useTasks";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useState } from "react";
import {
  Animated,
  Easing,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

interface Props {
  item: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

// ─── Animated Checkbox ────────────────────────────────────
function AnimatedCheckbox({
  checked,
  onPress,
  accent,
  success,
}: {
  checked: boolean;
  onPress: () => void;
  accent: string;
  success: string;
}) {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePress = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 80,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
    ]).start();
    onPress();
  }, [onPress, scaleAnim]);

  return (
    <Pressable onPress={handlePress} hitSlop={8}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {checked ? (
          <LinearGradient
            colors={[success, "#10B981"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.checkbox}
          >
            <Ionicons name="checkmark" size={16} color="#fff" />
          </LinearGradient>
        ) : (
          <View style={[styles.checkbox, { borderColor: accent }]}>
            <View style={styles.checkboxInner} />
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

// ─── Priority Strip ───────────────────────────────────────
function PriorityStrip({ priority }: { priority: "high" | "medium" | "low" }) {
  const colors = PRIORITY_CONFIG[priority];
  const gradientColors =
    priority === "high"
      ? (["#EF4444", "#DC2626"] as const)
      : priority === "medium"
        ? (["#FACC15", "#F59E0B"] as const)
        : (["#22C55E", "#16A34A"] as const);

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.priorityStrip}
    />
  );
}

// ─── Main TaskCard ────────────────────────────────────────
export function TaskCard({ item, onToggle, onDelete, onEdit }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [newSubTitle, setNewSubTitle] = useState("");

  const { addSubTask, toggleSubTask, deleteSubTask, archiveTask } = useTasks();

  const cardBg = useThemeColor({}, "card");
  const borderCol = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const textMuted = useThemeColor({}, "textMuted");
  const accent = useThemeColor({}, "accent");
  const accentSubtle = useThemeColor({}, "accentSubtle");
  const success = useThemeColor({}, "success");
  const danger = useThemeColor({}, "danger");
  const inputBg = useThemeColor({}, "inputBackground");

  const cat = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG.Personal;

  const totalSubs = item.subTasks?.length || 0;
  const completedSubs = item.subTasks?.filter((s) => s.completed).length || 0;
  const progress = totalSubs > 0 ? completedSubs / totalSubs : 0;

  const formattedDate = item.dueDate
    ? new Date(item.dueDate).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.cardContainer, { backgroundColor: cardBg }]}>
      {/* Priority Gradient Strip */}
      <PriorityStrip priority={item.priority} />

      {/* Card Content */}
      <View style={styles.cardContent}>
        {/* Row 1: Checkbox + Title + Actions */}
        <View style={styles.mainRow}>
          <AnimatedCheckbox
            checked={item.completed}
            onPress={onToggle}
            accent={accent}
            success={success}
          />

          <Pressable onPress={onEdit} style={styles.titleArea}>
            <ThemedText
              style={[styles.taskText, item.completed && styles.completedText]}
              numberOfLines={2}
            >
              {item.title}
            </ThemedText>
          </Pressable>

          {/* Action Icons */}
          <View style={styles.actions}>
            <Pressable
              onPress={() => archiveTask(item.id)}
              style={[styles.iconBtn, { backgroundColor: accentSubtle }]}
              hitSlop={6}
            >
              <Ionicons name="archive-outline" size={16} color={accent} />
            </Pressable>
            <Pressable
              onPress={onDelete}
              style={[
                styles.iconBtn,
                { backgroundColor: "rgba(239, 68, 68, 0.1)" },
              ]}
              hitSlop={6}
            >
              <Ionicons name="trash-outline" size={16} color={danger} />
            </Pressable>
          </View>
        </View>

        {/* Row 2: Category + Priority + Date */}
        <View style={styles.metaRow}>
          {/* Category Pill */}
          <View
            style={[styles.categoryPill, { backgroundColor: cat.color + "18" }]}
          >
            <Ionicons
              name={cat.icon as AppIconName}
              size={10}
              color={cat.color}
            />
            <ThemedText style={[styles.categoryPillText, { color: cat.color }]}>
              {cat.label}
            </ThemedText>
          </View>

          {/* Priority Badge */}
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: PRIORITY_CONFIG[item.priority].color + "20" },
            ]}
          >
            <ThemedText
              style={[
                styles.priorityBadgeText,
                { color: PRIORITY_CONFIG[item.priority].color },
              ]}
            >
              {PRIORITY_CONFIG[item.priority].label}
            </ThemedText>
          </View>

          {/* Date Chip */}
          {formattedDate && (
            <View style={styles.dateChip}>
              <Ionicons name="alarm-outline" size={11} color={textSecondary} />
              <ThemedText
                style={[styles.dateChipText, { color: textSecondary }]}
              >
                {formattedDate}
              </ThemedText>
            </View>
          )}

          {/* Subtask Toggle */}
          {totalSubs > 0 && (
            <Pressable
              onPress={toggleExpand}
              style={[styles.subtaskToggle, { backgroundColor: accentSubtle }]}
            >
              <Ionicons name="list-outline" size={12} color={accent} />
              <ThemedText style={[styles.subtaskToggleText, { color: accent }]}>
                {completedSubs}/{totalSubs}
              </ThemedText>
            </Pressable>
          )}
        </View>

        {/* Subtask Progress Bar */}
        {totalSubs > 0 && !expanded && (
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBarBg, { backgroundColor: borderCol }]}
            >
              <LinearGradient
                colors={["#6366F1", "#8B5CF6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.progressBarFill,
                  { width: `${progress * 100}%` },
                ]}
              />
            </View>
          </View>
        )}

        {/* Expanded Subtasks */}
        {expanded && (
          <View style={[styles.subtaskSection, { borderTopColor: borderCol }]}>
            {item.subTasks?.map((sub) => (
              <View key={sub.id} style={styles.subtaskItem}>
                <Pressable
                  onPress={() => toggleSubTask(item.id, sub.id)}
                  hitSlop={6}
                >
                  {sub.completed ? (
                    <LinearGradient
                      colors={["#22C55E", "#10B981"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.subCheckbox}
                    >
                      <Ionicons name="checkmark" size={10} color="#fff" />
                    </LinearGradient>
                  ) : (
                    <View
                      style={[
                        styles.subCheckbox,
                        styles.subCheckboxEmpty,
                        { borderColor: textMuted },
                      ]}
                    />
                  )}
                </Pressable>

                <ThemedText
                  style={[
                    styles.subtaskText,
                    sub.completed && styles.completedText,
                  ]}
                >
                  {sub.title}
                </ThemedText>

                <Pressable
                  onPress={() => deleteSubTask(item.id, sub.id)}
                  hitSlop={6}
                >
                  <Ionicons name="close" size={14} color={textMuted} />
                </Pressable>
              </View>
            ))}

            {/* Add Subtask Input */}
            <View style={styles.addSubtaskRow}>
              <View
                style={[
                  styles.subCheckbox,
                  styles.subCheckboxEmpty,
                  { borderColor: textMuted },
                ]}
              />
              <TextInput
                placeholder="Add a step..."
                placeholderTextColor={textMuted}
                value={newSubTitle}
                onChangeText={setNewSubTitle}
                style={[styles.subtaskInput, { color: textColor }]}
                onSubmitEditing={() => {
                  if (newSubTitle.trim()) {
                    addSubTask(item.id, newSubTitle);
                    setNewSubTitle("");
                  }
                }}
              />
              {newSubTitle.trim() ? (
                <Pressable
                  onPress={() => {
                    addSubTask(item.id, newSubTitle);
                    setNewSubTitle("");
                  }}
                  hitSlop={6}
                >
                  <LinearGradient
                    colors={["#6366F1", "#8B5CF6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.addSubBtn}
                  >
                    <Ionicons name="add" size={14} color="#fff" />
                  </LinearGradient>
                </Pressable>
              ) : null}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  // Priority strip on left edge
  priorityStrip: {
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },

  cardContent: {
    flex: 1,
    padding: 14,
    paddingLeft: 12,
  },

  // Row 1: Checkbox + Title + Actions
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  titleArea: {
    flex: 1,
  },
  taskText: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
  completedText: {
    textDecorationLine: "line-through",
    opacity: 0.4,
  },

  // Animated checkbox
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  checkboxInner: {
    width: 0,
    height: 0,
  },

  // Action buttons
  actions: {
    flexDirection: "row",
    gap: 6,
  },
  iconBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  // Row 2: Meta badges
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    flexWrap: "wrap",
  },
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  categoryPillText: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  priorityBadgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
  dateChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  dateChipText: {
    fontSize: 11,
    fontWeight: "500",
  },

  // Subtask toggle
  subtaskToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  subtaskToggleText: {
    fontSize: 10,
    fontWeight: "700",
  },

  // Progress bar
  progressBarContainer: {
    marginTop: 10,
  },
  progressBarBg: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 2,
  },

  // Subtask section
  subtaskSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  subtaskItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
  },
  subCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  subCheckboxEmpty: {
    borderWidth: 1.5,
  },
  subtaskText: {
    fontSize: 13,
    flex: 1,
  },

  // Add subtask input
  addSubtaskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  subtaskInput: {
    flex: 1,
    fontSize: 13,
    paddingVertical: 4,
  },
  addSubBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
});
