import { ThemedView } from "@/components/themed-view";
import { useTasks } from "@/hooks/useTasks";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

// Modular Components
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskEditModal } from "@/components/tasks/TaskEditModal";
import { TaskInput } from "@/components/tasks/TaskInput";
import { TaskSearchBar } from "@/components/tasks/TaskSearchBar";
import { EmptyState } from "@/components/ui/EmptyState"; // ✅ make sure this exists

export default function HomeScreen() {
  const { tasks, toggleTask, deleteTask, startEdit, search } = useTasks();

  return (
    <ThemedView style={styles.container}>
      <TaskSearchBar />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            item={item}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => deleteTask(item.id)}
            onEdit={() => startEdit(item)}
          />
        )}
        // ✅ EMPTY STATE
        ListEmptyComponent={
          <EmptyState
            icon={search ? "search-outline" : "checkmark-done-circle-outline"}
            title={search ? "No matches found" : "All caught up!"}
            message={
              search
                ? "Try searching for something else."
                : "Enjoy your day! Or add a new task below."
            }
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TaskInput />
      <TaskEditModal />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  listContent: { paddingBottom: 180, paddingTop: 10 },
});
