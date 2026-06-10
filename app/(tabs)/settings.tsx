import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const cardBg = useThemeColor({}, "card");
  const borderCol = useThemeColor({}, "border");
  const accent = useThemeColor({}, "accent");
  const accentSubtle = useThemeColor({}, "accentSubtle");
  const textSecondary = useThemeColor({}, "textSecondary");
  const textMuted = useThemeColor({}, "textMuted");
  const danger = useThemeColor({}, "danger");
  const dangerSubtle = useThemeColor({}, "dangerSubtle");

  return (
    <ThemedView style={styles.container}>
      <ThemedText
        type="subtitle"
        style={[styles.sectionTitle, { color: textSecondary }]}
      >
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
          <View style={[styles.iconWrapper, { backgroundColor: accentSubtle }]}>
            <Ionicons name="moon" size={20} color={accent} />
          </View>
          <ThemedText style={styles.settingLabel}>Appearance</ThemedText>
        </View>
        <ThemedText style={[styles.settingValue, { color: textMuted }]}>
          Dark Mode
        </ThemedText>
      </Pressable>

      <ThemedText
        type="subtitle"
        style={[styles.sectionTitle, { marginTop: 25, color: textSecondary }]}
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
          <View
            style={[styles.iconWrapper, { backgroundColor: textMuted + "20" }]}
          >
            <Ionicons name="information-circle" size={20} color={textMuted} />
          </View>
          <ThemedText style={styles.settingLabel}>Version</ThemedText>
        </View>
        <ThemedText style={[styles.settingValue, { color: textMuted }]}>
          1.0.0
        </ThemedText>
      </View>

      {/* Storage/Reset */}
      <Pressable
        style={[
          styles.card,
          { backgroundColor: cardBg, borderColor: borderCol },
        ]}
      >
        <View style={styles.leftRow}>
          <View style={[styles.iconWrapper, { backgroundColor: dangerSubtle }]}>
            <Ionicons name="trash-bin-outline" size={20} color={danger} />
          </View>
          <ThemedText style={styles.settingLabel}>Clear All Data</ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={18} color={textMuted} />
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
    fontWeight: "500",
  },
});
