import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { EmptyState } from "@/components/ui/EmptyState";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useTasks } from "@/hooks/useTasks";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

export default function ArchiveScreen() {
  const { archivedTasks, unarchiveTask, deleteTask } = useTasks();
  const cardBg = useThemeColor({}, "card");
  const borderCol = useThemeColor({}, "border");

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={archivedTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            icon="archive-outline"
            title="Archive is Empty"
            message="Tasks you archive will appear here."
          />
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: cardBg, borderColor: borderCol },
            ]}
          >
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.taskTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.categoryText}>
                {item.category}
              </ThemedText>
            </View>

            <View style={styles.actions}>
              {/* Restore Button */}
              <Pressable
                onPress={() => unarchiveTask(item.id)}
                style={styles.actionBtn}
              >
                <Ionicons name="refresh-outline" size={22} color="#22C55E" />
                <ThemedText style={styles.actionLabel}>Restore</ThemedText>
              </Pressable>

              {/* Permanent Delete Button */}
              <Pressable
                onPress={() => deleteTask(item.id)}
                style={styles.actionBtn}
              >
                <Ionicons name="trash-outline" size={22} color="#EF4444" />
                <ThemedText style={styles.actionLabel}>Delete</ThemedText>
              </Pressable>
            </View>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  listContent: { paddingVertical: 20, flexGrow: 1 },
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  taskTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4, opacity: 0.7 },
  categoryText: {
    fontSize: 12,
    color: "#94A3B8",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  actions: { flexDirection: "row", gap: 15 },
  actionBtn: { alignItems: "center", gap: 2 },
  actionLabel: { fontSize: 10, fontWeight: "700", color: "#94A3B8" },
});
