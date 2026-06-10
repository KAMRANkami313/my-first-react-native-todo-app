import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
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

  // ✅ UPDATED HOOK
  const { addSubTask, toggleSubTask, deleteSubTask, archiveTask } = useTasks();

  const cardBg = useThemeColor({}, "card");
  const borderCol = useThemeColor({}, "border");
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
            <Ionicons name={cat.icon as any} size={12} color={cat.color} />
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
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progress * 100}%` },
                ]}
              />
            </View>
            <ThemedText style={styles.progressText}>
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
                <Ionicons name="alarm-outline" size={12} color="#94A3B8" />
                <ThemedText style={styles.dateBadgeText}>
                  {formattedDate}
                </ThemedText>
              </View>
            )}
          </View>

          <Pressable
            onPress={() => setExpanded(!expanded)}
            style={styles.checklistToggle}
          >
            <Ionicons name="list-outline" size={16} color="#6366F1" />
            <ThemedText style={styles.checklistToggleText}>
              {totalSubs}
            </ThemedText>
          </Pressable>
        </View>

        {expanded && (
          <View style={styles.subTasksList}>
            {item.subTasks?.map((sub) => (
              <View key={sub.id} style={styles.subTaskItem}>
                <Pressable onPress={() => toggleSubTask(item.id, sub.id)}>
                  <Ionicons
                    name={sub.completed ? "checkbox" : "square-outline"}
                    size={20}
                    color={sub.completed ? "#22C55E" : "#94A3B8"}
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
                    color="#EF4444"
                  />
                </Pressable>
              </View>
            ))}

            <View style={styles.addSubTaskRow}>
              <TextInput
                placeholder="Add step..."
                placeholderTextColor="#64748B"
                value={newSubTitle}
                onChangeText={setNewSubTitle}
                style={styles.subTaskInput}
              />

              <Pressable
                onPress={() => {
                  if (newSubTitle.trim()) {
                    addSubTask(item.id, newSubTitle);
                    setNewSubTitle("");
                  }
                }}
              >
                <Ionicons name="add-circle" size={24} color="#6366F1" />
              </Pressable>
            </View>
          </View>
        )}
      </View>

      {/* ✅ UPDATED ACTIONS */}
      <View style={styles.actions}>
        <Pressable onPress={onToggle} hitSlop={10}>
          <Ionicons
            name={item.completed ? "checkmark-circle" : "ellipse-outline"}
            size={26}
            color={item.completed ? "#22C55E" : "#64748B"}
          />
        </Pressable>

        {/* ✅ ARCHIVE BUTTON */}
        <Pressable onPress={() => archiveTask(item.id)} hitSlop={10}>
          <Ionicons name="archive-outline" size={22} color="#6366F1" />
        </Pressable>

        <Pressable onPress={onDelete} hitSlop={10}>
          <Ionicons name="trash-outline" size={24} color="#EF4444" />
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
    backgroundColor: "#334155",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#6366F1",
  },
  progressText: {
    fontSize: 10,
    color: "#94A3B8",
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
    color: "#94A3B8",
  },
  checklistToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  checklistToggleText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6366F1",
  },
  actions: {
    gap: 15,
    marginLeft: 15,
  },
  subTasksList: {
    marginTop: 15,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: "#334155",
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
    color: "#CBD5E1",
  },
  addSubTaskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 5,
  },
  subTaskInput: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
  },
});
