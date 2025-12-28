import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const cardBg = useThemeColor({}, "card");
  const borderCol = useThemeColor({}, "border");

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        App Preferences
      </ThemedText>

      {/* Theme Setting Card */}
      <Pressable
        style={[
          styles.card,
          { backgroundColor: cardBg, borderColor: borderCol },
        ]}
      >
        <View style={styles.leftRow}>
          <View style={[styles.iconWrapper, { backgroundColor: "#6366F120" }]}>
            <Ionicons name="moon" size={20} color="#6366F1" />
          </View>
          <ThemedText style={styles.settingLabel}>Appearance</ThemedText>
        </View>
        <ThemedText style={styles.settingValue}>Dark Mode</ThemedText>
      </Pressable>

      <ThemedText
        type="subtitle"
        style={[styles.sectionTitle, { marginTop: 25 }]}
      >
        System
      </ThemedText>

      {/* Version Card */}
      <View
        style={[
          styles.card,
          { backgroundColor: cardBg, borderColor: borderCol },
        ]}
      >
        <View style={styles.leftRow}>
          <View style={[styles.iconWrapper, { backgroundColor: "#94A3B820" }]}>
            <Ionicons name="information-circle" size={20} color="#94A3B8" />
          </View>
          <ThemedText style={styles.settingLabel}>Version</ThemedText>
        </View>
        <ThemedText style={styles.settingValue}>1.0.0</ThemedText>
      </View>

      {/* Storage/Reset (Placeholder for future feature) */}
      <Pressable
        style={[
          styles.card,
          { backgroundColor: cardBg, borderColor: borderCol },
        ]}
      >
        <View style={styles.leftRow}>
          <View style={[styles.iconWrapper, { backgroundColor: "#EF444420" }]}>
            <Ionicons name="trash-bin-outline" size={20} color="#EF4444" />
          </View>
          <ThemedText style={styles.settingLabel}>Clear All Data</ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#475569" />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  settingValue: {
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: "500",
  },
});
