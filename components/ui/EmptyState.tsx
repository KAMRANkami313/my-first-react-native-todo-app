import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

export function EmptyState({
  icon,
  title,
  message,
}: {
  icon: any;
  title: string;
  message: string;
}) {
  const accent = useThemeColor({}, "accent");
  const accentSubtle = useThemeColor({}, "accentSubtle");
  const textSecondary = useThemeColor({}, "textSecondary");

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: accentSubtle }]}>
        <Ionicons name={icon} size={48} color={accent} />
      </View>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={[styles.message, { color: textSecondary }]}>
        {message}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    padding: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
