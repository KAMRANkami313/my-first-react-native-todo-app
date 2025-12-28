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

  const filterData = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Done", value: "completed" },
  ];

  return (
    <View style={styles.topRow}>
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: cardBg, borderColor: borderCol },
        ]}
      >
        <Ionicons name="search" size={18} color="#94A3B8" />
        <TextInput
          placeholder="Search tasks..."
          placeholderTextColor="#94A3B8"
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
        containerStyle={[styles.dropdownList, { backgroundColor: cardBg }]}
        itemTextStyle={{ color: textColor }}
        selectedTextStyle={{ color: textColor }}
        activeColor="rgba(99, 102, 241, 0.2)"
        data={filterData}
        labelField="label"
        valueField="value"
        value={filter}
        onChange={(item) => setFilter(item.value as any)}
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
  dropdownList: { borderRadius: 12, borderWidth: 1, borderColor: "#334155" },
});
