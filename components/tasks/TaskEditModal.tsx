import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  CATEGORY_DROPDOWN_DATA,
  PRIORITY_DROPDOWN_DATA,
  TaskCategory,
  TaskPriority,
} from "@/features/tasks/task.types";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useTasks } from "@/hooks/useTasks";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export function TaskEditModal() {
  const { editingTask, cancelEdit, updateTask } = useTasks();

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [category, setCategory] = useState<TaskCategory>("Personal");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const cardBg = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const borderCol = useThemeColor({}, "border");
  const textSecondary = useThemeColor({}, "textSecondary");
  const textMuted = useThemeColor({}, "textMuted");
  const inputBg = useThemeColor({}, "inputBackground");
  const accent = useThemeColor({}, "accent");
  const overlay = useThemeColor({}, "overlay");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setNotes(editingTask.notes || "");
      setPriority(editingTask.priority);
      setCategory(editingTask.category);
      setDate(editingTask.dueDate ? new Date(editingTask.dueDate) : new Date());
    }
  }, [editingTask]);

  if (!editingTask) return null;

  const handleSave = () => {
    if (title.trim()) {
      updateTask(editingTask.id, {
        title,
        notes,
        priority,
        category,
        dueDate: date.toISOString(),
      });
    }
  };

  return (
    <Modal visible={!!editingTask} transparent animationType="slide">
      <View style={[styles.overlay, { backgroundColor: overlay }]}>
        <ThemedView style={[styles.content, { borderColor: borderCol }]}>
          <ThemedText type="subtitle" style={styles.modalTitle}>
            Update Task
          </ThemedText>

          {/* TITLE */}
          <ThemedText style={[styles.label, { color: textSecondary }]}>
            Task Title
          </ThemedText>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={[
              styles.input,
              {
                backgroundColor: inputBg,
                color: textColor,
                borderColor: borderCol,
              },
            ]}
          />

          {/* NOTES */}
          <ThemedText style={[styles.label, { color: textSecondary }]}>
            Notes
          </ThemedText>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Add details about this task..."
            placeholderTextColor={textMuted}
            multiline
            style={[
              styles.input,
              styles.textArea,
              {
                backgroundColor: inputBg,
                color: textColor,
                borderColor: borderCol,
              },
            ]}
          />

          {/* PRIORITY + CATEGORY */}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <ThemedText style={[styles.label, { color: textSecondary }]}>
                Priority
              </ThemedText>
              <Dropdown
                style={[styles.dropdown, { borderColor: borderCol }]}
                data={PRIORITY_DROPDOWN_DATA}
                labelField="label"
                valueField="value"
                value={priority}
                onChange={(item) => setPriority(item.value)}
                selectedTextStyle={{ color: textColor }}
                containerStyle={{ backgroundColor: cardBg }}
              />
            </View>

            <View style={{ flex: 1, marginLeft: 10 }}>
              <ThemedText style={[styles.label, { color: textSecondary }]}>
                Category
              </ThemedText>
              <Dropdown
                style={[styles.dropdown, { borderColor: borderCol }]}
                data={CATEGORY_DROPDOWN_DATA}
                labelField="label"
                valueField="value"
                value={category}
                onChange={(item) => setCategory(item.value)}
                selectedTextStyle={{ color: textColor }}
                containerStyle={{ backgroundColor: cardBg }}
              />
            </View>
          </View>

          {/* DATE */}
          <ThemedText style={[styles.label, { color: textSecondary }]}>
            Due Date
          </ThemedText>
          <Pressable
            onPress={() => setShowPicker(true)}
            style={[
              styles.input,
              {
                backgroundColor: inputBg,
                borderColor: borderCol,
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <ThemedText>{date.toDateString()}</ThemedText>
            <Ionicons name="calendar-outline" size={20} color={accent} />
          </Pressable>

          {/* ACTIONS */}
          <View style={styles.buttons}>
            <Pressable onPress={cancelEdit} style={styles.btn}>
              <ThemedText style={{ color: textSecondary }}>Cancel</ThemedText>
            </Pressable>

            <Pressable
              style={[styles.saveBtn, { backgroundColor: accent }]}
              onPress={handleSave}
            >
              <ThemedText style={{ color: "#fff", fontWeight: "bold" }}>
                Save Changes
              </ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(e, d) => {
            setShowPicker(false);
            if (d) setDate(d);
          }}
        />
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  content: {
    borderRadius: 28,
    padding: 25,
    borderWidth: 1,
  },
  modalTitle: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  input: {
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    height: 45,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
    alignItems: "center",
  },
  saveBtn: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  btn: {
    padding: 10,
  },
});
