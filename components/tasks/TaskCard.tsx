import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  AppIconName,
  CATEGORY_CONFIG,
  PRIORITY_CONFIG,
  Task,
} from "@/features/tasks/task.types";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useTasks } from "@/hooks/useTasks";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

interface Props {
  item: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

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

  return (
    <ThemedView
      style={[styles.card, { backgroundColor: cardBg, borderColor: borderCol }]}
    >
      <View style={{ flex: 1 }}>
        <Pressable onPress={onEdit}>
          <View style={styles.cardHeader}>
            <Ionicons
              name={cat.icon as AppIconName}
              size={12}
              color={cat.color}
            />
            <ThemedText style={[styles.categoryLabel, { color: cat.color }]}>
              {cat.label}
            </ThemedText>
          </View>

          <ThemedText
            style={[styles.taskText, item.completed && styles.completed]}
          >
            {item.title}
          </ThemedText>
        </Pressable>

        {totalSubs > 0 && (
          <View style={styles.progressContainer}>
            <View
              style={[styles.progressBarBg, { backgroundColor: borderCol }]}
            >
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progress * 100}%`, backgroundColor: accent },
                ]}
              />
            </View>
            <ThemedText style={[styles.progressText, { color: textSecondary }]}>
              {completedSubs}/{totalSubs}
            </ThemedText>
          </View>
        )}

        <View style={styles.metaRow}>
          <View style={styles.badgeRow}>
            <View
              style={[
                styles.priorityBadge,
                {
                  backgroundColor: PRIORITY_CONFIG[item.priority].color,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.badgeText,
                  {
                    color: item.priority === "medium" ? "#000" : "#fff",
                  },
                ]}
              >
                {item.priority}
              </ThemedText>
            </View>

            {formattedDate && (
              <View style={styles.dateBadge}>
                <Ionicons
                  name="alarm-outline"
                  size={12}
                  color={textSecondary}
                />
                <ThemedText
                  style={[styles.dateBadgeText, { color: textSecondary }]}
                >
                  {formattedDate}
                </ThemedText>
              </View>
            )}
          </View>

          <Pressable
            onPress={() => setExpanded(!expanded)}
            style={[styles.checklistToggle, { backgroundColor: accentSubtle }]}
          >
            <Ionicons name="list-outline" size={16} color={accent} />
            <ThemedText style={[styles.checklistToggleText, { color: accent }]}>
              {totalSubs}
            </ThemedText>
          </Pressable>
        </View>

        {expanded && (
          <View style={[styles.subTasksList, { borderLeftColor: borderCol }]}>
            {item.subTasks?.map((sub) => (
              <View key={sub.id} style={styles.subTaskItem}>
                <Pressable onPress={() => toggleSubTask(item.id, sub.id)}>
                  <Ionicons
                    name={sub.completed ? "checkbox" : "square-outline"}
                    size={20}
                    color={sub.completed ? success : textSecondary}
                  />
                </Pressable>

                <ThemedText
                  style={[
                    styles.subTaskText,
                    sub.completed && styles.completed,
                  ]}
                >
                  {sub.title}
                </ThemedText>

                <Pressable onPress={() => deleteSubTask(item.id, sub.id)}>
                  <Ionicons
                    name="close-circle-outline"
                    size={18}
                    color={danger}
                  />
                </Pressable>
              </View>
            ))}

            <View style={styles.addSubTaskRow}>
              <TextInput
                placeholder="Add step..."
                placeholderTextColor={textMuted}
                value={newSubTitle}
                onChangeText={setNewSubTitle}
                style={[styles.subTaskInput, { color: textColor }]}
              />

              <Pressable
                onPress={() => {
                  if (newSubTitle.trim()) {
                    addSubTask(item.id, newSubTitle);
                    setNewSubTitle("");
                  }
                }}
              >
                <Ionicons name="add-circle" size={24} color={accent} />
              </Pressable>
            </View>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <Pressable onPress={onToggle} hitSlop={10}>
          <Ionicons
            name={item.completed ? "checkmark-circle" : "ellipse-outline"}
            size={26}
            color={item.completed ? success : textMuted}
          />
        </Pressable>

        <Pressable onPress={() => archiveTask(item.id)} hitSlop={10}>
          <Ionicons name="archive-outline" size={22} color={accent} />
        </Pressable>

        <Pressable onPress={onDelete} hitSlop={10}>
          <Ionicons name="trash-outline" size={24} color={danger} />
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 24,
    marginBottom: 15,
    alignItems: "flex-start",
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  taskText: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },
  completed: {
    textDecorationLine: "line-through",
    opacity: 0.4,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 8,
  },
  progressBarBg: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
  },
  progressText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateBadgeText: {
    fontSize: 12,
  },
  checklistToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  checklistToggleText: {
    fontSize: 11,
    fontWeight: "800",
  },
  actions: {
    gap: 15,
    marginLeft: 15,
  },
  subTasksList: {
    marginTop: 15,
    paddingLeft: 10,
    borderLeftWidth: 2,
  },
  subTaskItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  subTaskText: {
    fontSize: 14,
    flex: 1,
  },
  addSubTaskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 5,
  },
  subTaskInput: {
    flex: 1,
    fontSize: 14,
  },
});
