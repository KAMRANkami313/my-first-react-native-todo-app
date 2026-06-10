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
  const textMuted = useThemeColor({}, "textMuted");
  const accent = useThemeColor({}, "accent");
  const accentSubtle = useThemeColor({}, "accentSubtle");

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
            data={PRIORITY_DROPDOWN_DATA}
            labelField="label"
            valueField="value"
            value={priority}
            onChange={(item) => setPriority(item.value)}
            selectedTextStyle={[styles.dropdownText, { color: accent }]}
          />
          <Dropdown
            style={styles.dropdown}
            data={CATEGORY_DROPDOWN_DATA}
            labelField="label"
            valueField="value"
            value={category}
            onChange={(item) => setCategory(item.value)}
            selectedTextStyle={[styles.dropdownText, { color: textMuted }]}
          />
          <Pressable
            onPress={() => setShowPicker(true)}
            style={[styles.dateSelector, { backgroundColor: accentSubtle }]}
          >
            <Ionicons name="calendar-outline" size={14} color={accent} />
            <ThemedText style={[styles.dateText, { color: accent }]}>
              {dueDate.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Add a new task..."
            placeholderTextColor={textMuted}
            value={text}
            onChangeText={setText}
            style={[styles.input, { color: textColor }]}
          />
          <Pressable
            style={[styles.addBtn, { backgroundColor: accent }]}
            onPress={handleAdd}
          >
            <Ionicons name="add" size={28} color="#fff" />
          </Pressable>
        </View>

        {showPicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={(e, d) => {
              setShowPicker(false);
              if (d) setDueDate(d);
            }}
          />
        )}
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
  dropdownText: { fontWeight: "bold", fontSize: 12 },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  dateText: { fontSize: 11, fontWeight: "700" },
  inputRow: { flexDirection: "row", alignItems: "center" },
  input: { flex: 1, fontSize: 16 },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
