import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTasks } from "../../hooks/useTasks";

export default function DashboardScreen() {
  const { stats } = useTasks();

  // Helper for pluralization
  const taskLabel = (count: number) => (count === 1 ? "task" : "tasks");

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedText type="title" style={styles.welcomeText}>
          Productivity Overview
        </ThemedText>

        {/* Main Progress Card */}
        <View style={styles.mainCard}>
          <View>
            <ThemedText style={styles.cardTitle}>Completion Rate</ThemedText>
            <ThemedText style={styles.percentage}>{stats.progress}%</ThemedText>
          </View>
          <View style={styles.progressCircle}>
            <Ionicons name="analytics" size={40} color="#6366F1" />
          </View>
        </View>

        <View style={styles.statsRow}>
          <StatMiniCard label="Total" value={stats.total} />
          <StatMiniCard
            label="Pending"
            value={stats.active}
            highlight="#FACC15"
          />
        </View>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Focus Areas
        </ThemedText>

        <FocusItem
          icon="alert-circle"
          color="#EF4444"
          title="High Priority Pending"
          subtitle={`${stats.highPriorityPending} ${taskLabel(stats.highPriorityPending)} require action`}
        />

        <FocusItem
          icon="time-outline"
          color="#6366F1"
          title="Medium Priority"
          subtitle={`${stats.medPriorityPending} ${taskLabel(stats.medPriorityPending)} in your backlog`}
        />
      </ScrollView>
    </ThemedView>
  );
}

// Sub-components
const StatMiniCard = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: string;
}) => (
  <View
    style={[
      styles.miniCard,
      highlight ? { borderLeftColor: highlight, borderLeftWidth: 4 } : null,
    ]}
  >
    <ThemedText style={styles.miniLabel}>{label}</ThemedText>
    {/* Explicit White color to fix invisible text issue */}
    <ThemedText style={styles.miniValue}>{value}</ThemedText>
  </View>
);

const FocusItem = ({
  icon,
  color,
  title,
  subtitle,
}: {
  icon: any;
  color: string;
  title: string;
  subtitle: string;
}) => (
  <View style={styles.focusItem}>
    <View style={[styles.iconBg, { backgroundColor: `${color}20` }]}>
      <Ionicons name={icon} size={22} color={color} />
    </View>
    <View style={{ marginLeft: 15, flex: 1 }}>
      <ThemedText style={styles.focusText}>{title}</ThemedText>
      <ThemedText style={styles.focusSubtext}>{subtitle}</ThemedText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  welcomeText: { marginBottom: 25, marginTop: 10, fontSize: 28 },

  mainCard: {
    backgroundColor: "#1E293B",
    borderRadius: 24,
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardTitle: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  percentage: {
    color: "#FFFFFF", // FIXED: Was invisible
    fontSize: 52,
    fontWeight: "900",
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#334155",
  },

  statsRow: { flexDirection: "row", gap: 15, marginBottom: 30 },
  miniCard: {
    flex: 1,
    backgroundColor: "#1E293B",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  miniLabel: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  miniValue: {
    color: "#FFFFFF", // FIXED: Was invisible
    fontSize: 28,
    fontWeight: "bold",
  },

  sectionTitle: { marginBottom: 15, fontSize: 20, fontWeight: "700" },
  focusItem: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  focusText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  focusSubtext: { color: "#94A3B8", fontSize: 14, marginTop: 2 },
});
