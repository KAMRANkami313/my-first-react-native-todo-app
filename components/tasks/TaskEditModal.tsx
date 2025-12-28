import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
    CATEGORY_CONFIG,
    PRIORITY_CONFIG,
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
  const [notes, setNotes] = useState(""); // ✅ NOTES STATE
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [category, setCategory] = useState<TaskCategory>("Personal");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const cardBg = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const borderCol = useThemeColor({}, "border");

  // ✅ SYNC STATE
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setNotes(editingTask.notes || ""); // ✅ SYNC NOTES
      setPriority(editingTask.priority);
      setCategory(editingTask.category);
      setDate(editingTask.dueDate ? new Date(editingTask.dueDate) : new Date());
    }
  }, [editingTask]);

  if (!editingTask) return null;

  // ✅ SAVE HANDLER
  const handleSave = () => {
    if (title.trim()) {
      updateTask(editingTask.id, {
        title,
        notes, // ✅ INCLUDE NOTES
        priority,
        category,
        dueDate: date.toISOString(),
      });
    }
  };

  return (
    <Modal visible={!!editingTask} transparent animationType="slide">
      <View style={styles.overlay}>
        <ThemedView style={[styles.content, { borderColor: borderCol }]}>
          <ThemedText type="subtitle" style={styles.modalTitle}>
            Update Task
          </ThemedText>

          {/* TITLE */}
          <ThemedText style={styles.label}>Task Title</ThemedText>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={[
              styles.input,
              {
                backgroundColor: "#0F172A",
                color: "#fff",
                borderColor: borderCol,
              },
            ]}
          />

          {/* NOTES */}
          <ThemedText style={styles.label}>Notes</ThemedText>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Add details about this task..."
            placeholderTextColor="#475569"
            multiline
            style={[
              styles.input,
              styles.textArea,
              {
                backgroundColor: "#0F172A",
                color: "#fff",
                borderColor: borderCol,
              },
            ]}
          />

          {/* PRIORITY + CATEGORY */}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.label}>Priority</ThemedText>
              <Dropdown
                style={[styles.dropdown, { borderColor: borderCol }]}
                data={Object.entries(PRIORITY_CONFIG).map(([k, v]) => ({
                  label: v.label,
                  value: k,
                }))}
                labelField="label"
                valueField="value"
                value={priority}
                onChange={(item) => setPriority(item.value as any)}
                selectedTextStyle={{ color: textColor }}
                containerStyle={{ backgroundColor: cardBg }}
              />
            </View>

            <View style={{ flex: 1, marginLeft: 10 }}>
              <ThemedText style={styles.label}>Category</ThemedText>
              <Dropdown
                style={[styles.dropdown, { borderColor: borderCol }]}
                data={Object.entries(CATEGORY_CONFIG).map(([k, v]) => ({
                  label: v.label,
                  value: k,
                }))}
                labelField="label"
                valueField="value"
                value={category}
                onChange={(item) => setCategory(item.value as any)}
                selectedTextStyle={{ color: textColor }}
                containerStyle={{ backgroundColor: cardBg }}
              />
            </View>
          </View>

          {/* DATE */}
          <ThemedText style={styles.label}>Due Date</ThemedText>
          <Pressable
            onPress={() => setShowPicker(true)}
            style={[
              styles.input,
              {
                backgroundColor: "#0F172A",
                borderColor: borderCol,
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <ThemedText>{date.toDateString()}</ThemedText>
            <Ionicons name="calendar-outline" size={20} color="#6366F1" />
          </Pressable>

          {/* ACTIONS */}
          <View style={styles.buttons}>
            <Pressable onPress={cancelEdit} style={styles.btn}>
              <ThemedText style={{ color: "#94A3B8" }}>Cancel</ThemedText>
            </Pressable>

            <Pressable style={styles.saveBtn} onPress={handleSave}>
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
    backgroundColor: "rgba(0,0,0,0.85)",
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
    color: "#94A3B8",
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
    height: 80, // ✅ matches your spec
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
    backgroundColor: "#6366F1",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  btn: {
    padding: 10,
  },
});
