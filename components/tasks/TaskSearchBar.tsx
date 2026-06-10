import { FILTER_DROPDOWN_DATA, TaskFilter } from "@/features/tasks/task.types";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useTasks } from "@/hooks/useTasks";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export function TaskSearchBar() {
  const { search, setSearch, filter, setFilter } = useTasks();
  const cardBg = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const borderCol = useThemeColor({}, "border");
  const textMuted = useThemeColor({}, "textMuted");
  const accent = useThemeColor({}, "accent");

  return (
    <View style={styles.topRow}>
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: cardBg, borderColor: borderCol },
        ]}
      >
        <Ionicons name="search" size={18} color={textMuted} />
        <TextInput
          placeholder="Search tasks..."
          placeholderTextColor={textMuted}
          value={search}
          onChangeText={setSearch}
          style={[styles.searchInput, { color: textColor }]}
        />
      </View>

      <Dropdown
        style={[
          styles.filterDropdown,
          { backgroundColor: cardBg, borderColor: borderCol },
        ]}
        containerStyle={[
          styles.dropdownList,
          { backgroundColor: cardBg, borderColor: borderCol },
        ]}
        itemTextStyle={{ color: textColor }}
        selectedTextStyle={{ color: textColor }}
        activeColor={accent + "20"}
        data={FILTER_DROPDOWN_DATA}
        labelField="label"
        valueField="value"
        value={filter}
        onChange={(item) => setFilter(item.value as TaskFilter)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: "row", gap: 10, marginVertical: 15 },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15 },
  filterDropdown: {
    width: 100,
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 48,
    borderWidth: 1,
  },
  dropdownList: { borderRadius: 12, borderWidth: 1 },
});
