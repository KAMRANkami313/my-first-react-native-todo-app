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
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

// ✅ ADDED
import { AppDatePicker } from "../ui/AppDatePicker";

export function TaskInput() {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [category, setCategory] = useState<TaskCategory>("Personal");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const { addTask } = useTasks();
  const cardBg = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const borderCol = useThemeColor({}, "border");

  const handleAdd = () => {
    if (text.trim()) {
      addTask(text, priority, category, dueDate.toISOString());
      setText("");
      setPriority("medium");
      setCategory("Personal");
      setDueDate(new Date());
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
      style={styles.wrapper}
    >
      <ThemedView
        style={[
          styles.container,
          { backgroundColor: cardBg, borderColor: borderCol },
        ]}
      >
        <View style={styles.selectors}>
          <Dropdown
            style={styles.dropdown}
            data={Object.entries(PRIORITY_CONFIG).map(([k, v]) => ({
              label: v.label,
              value: k,
            }))}
            labelField="label"
            valueField="value"
            value={priority}
            onChange={(item) => setPriority(item.value as any)}
            selectedTextStyle={styles.dropdownText}
          />

          <Dropdown
            style={styles.dropdown}
            data={Object.entries(CATEGORY_CONFIG).map(([k, v]) => ({
              label: v.label,
              value: k,
            }))}
            labelField="label"
            valueField="value"
            value={category}
            onChange={(item) => setCategory(item.value as any)}
            selectedTextStyle={[styles.dropdownText, { color: "#94A3B8" }]}
          />

          {/* DATE + TIME DISPLAY */}
          {Platform.OS !== "web" ? (
            <Pressable
              onPress={() => setShowPicker(true)}
              style={styles.dateSelector}
            >
              <Ionicons name="time-outline" size={14} color="#6366F1" />
              <ThemedText style={styles.dateText}>
                {dueDate.toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })}{" "}
                {dueDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </ThemedText>
            </Pressable>
          ) : null}

          {/* PICKER */}
          <AppDatePicker
            value={dueDate}
            onChange={setDueDate}
            show={showPicker}
            setShow={setShowPicker}
          />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Add a new task..."
            placeholderTextColor="#64748B"
            value={text}
            onChangeText={setText}
            style={[styles.input, { color: textColor }]}
          />
          <Pressable style={styles.addBtn} onPress={handleAdd}>
            <Ionicons name="add" size={28} color="#fff" />
          </Pressable>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: "absolute", bottom: 25, left: 16, right: 16 },
  container: { borderRadius: 22, padding: 12, borderWidth: 1, elevation: 8 },
  selectors: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  dropdown: { width: 90, height: 28 },
  dropdownText: { color: "#6366F1", fontWeight: "bold", fontSize: 12 },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  dateText: { fontSize: 11, fontWeight: "700", color: "#6366F1" },
  inputRow: { flexDirection: "row", alignItems: "center" },
  input: { flex: 1, fontSize: 16 },
  addBtn: {
    backgroundColor: "#6366F1",
    width: 44,
    height: 44,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
