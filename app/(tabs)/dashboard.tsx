import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AppIconName } from "@/features/tasks/task.types";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useTasks } from "@/hooks/useTasks";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function DashboardScreen() {
  const { stats } = useTasks();

  const cardBg = useThemeColor({}, "card");
  const borderCol = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const accent = useThemeColor({}, "accent");
  const bgDarker = useThemeColor({}, "inputBackground");
  const shadowColor = useThemeColor({}, "shadow");

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
        <View
          style={[
            styles.mainCard,
            {
              backgroundColor: cardBg,
              borderColor: borderCol,
              shadowColor,
            },
          ]}
        >
          <View>
            <ThemedText style={[styles.cardTitle, { color: textSecondary }]}>
              Completion Rate
            </ThemedText>
            <ThemedText style={[styles.percentage, { color: textColor }]}>
              {stats.progress}%
            </ThemedText>
          </View>
          <View
            style={[
              styles.progressCircle,
              { backgroundColor: bgDarker, borderColor: borderCol },
            ]}
          >
            <Ionicons name="analytics" size={40} color={accent} />
          </View>
        </View>

        <View style={styles.statsRow}>
          <StatMiniCard
            label="Total"
            value={stats.total}
            cardBg={cardBg}
            borderCol={borderCol}
            textColor={textColor}
            textSecondary={textSecondary}
          />
          <StatMiniCard
            label="Pending"
            value={stats.active}
            highlight="#FACC15"
            cardBg={cardBg}
            borderCol={borderCol}
            textColor={textColor}
            textSecondary={textSecondary}
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
          cardBg={cardBg}
          borderCol={borderCol}
          textColor={textColor}
          textSecondary={textSecondary}
        />

        <FocusItem
          icon="time-outline"
          color="#6366F1"
          title="Medium Priority"
          subtitle={`${stats.medPriorityPending} ${taskLabel(stats.medPriorityPending)} in your backlog`}
          cardBg={cardBg}
          borderCol={borderCol}
          textColor={textColor}
          textSecondary={textSecondary}
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
  cardBg,
  borderCol,
  textColor,
  textSecondary,
}: {
  label: string;
  value: number;
  highlight?: string;
  cardBg: string;
  borderCol: string;
  textColor: string;
  textSecondary: string;
}) => (
  <View
    style={[
      styles.miniCard,
      {
        backgroundColor: cardBg,
        borderColor: borderCol,
        borderLeftColor: highlight ?? borderCol,
        borderLeftWidth: highlight ? 4 : 1,
      },
    ]}
  >
    <ThemedText style={[styles.miniLabel, { color: textSecondary }]}>
      {label}
    </ThemedText>
    <ThemedText style={[styles.miniValue, { color: textColor }]}>
      {value}
    </ThemedText>
  </View>
);

const FocusItem = ({
  icon,
  color,
  title,
  subtitle,
  cardBg,
  borderCol,
  textColor,
  textSecondary,
}: {
  icon: AppIconName;
  color: string;
  title: string;
  subtitle: string;
  cardBg: string;
  borderCol: string;
  textColor: string;
  textSecondary: string;
}) => (
  <View
    style={[
      styles.focusItem,
      { backgroundColor: cardBg, borderColor: borderCol },
    ]}
  >
    <View style={[styles.iconBg, { backgroundColor: `${color}20` }]}>
      <Ionicons name={icon as any} size={22} color={color} />
    </View>
    <View style={{ marginLeft: 15, flex: 1 }}>
      <ThemedText style={[styles.focusText, { color: textColor }]}>
        {title}
      </ThemedText>
      <ThemedText style={[styles.focusSubtext, { color: textSecondary }]}>
        {subtitle}
      </ThemedText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  welcomeText: { marginBottom: 25, marginTop: 10, fontSize: 28 },

  mainCard: {
    borderRadius: 24,
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  percentage: {
    fontSize: 52,
    fontWeight: "900",
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },

  statsRow: { flexDirection: "row", gap: 15, marginBottom: 30 },
  miniCard: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  miniLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  miniValue: {
    fontSize: 28,
    fontWeight: "bold",
  },

  sectionTitle: { marginBottom: 15, fontSize: 20, fontWeight: "700" },
  focusItem: {
    flexDirection: "row",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  focusText: { fontSize: 16, fontWeight: "700" },
  focusSubtext: { fontSize: 14, marginTop: 2 },
});
