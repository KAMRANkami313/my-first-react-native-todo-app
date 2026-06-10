import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";

export default function DrawerLayout() {
  const cardBg = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const accent = useThemeColor({}, "accent");
  const textMuted = useThemeColor({}, "textMuted");
  const borderCol = useThemeColor({}, "border");

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: cardBg,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: textColor,
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 18,
        },

        drawerStyle: {
          backgroundColor: cardBg,
          width: 280,
        },
        drawerActiveTintColor: accent,
        drawerInactiveTintColor: textMuted,
        drawerActiveBackgroundColor:
          accent === "#6366F1"
            ? "rgba(99, 102, 241, 0.1)"
            : "rgba(99, 102, 241, 0.1)",
        drawerLabelStyle: {
          marginLeft: -10,
          fontSize: 15,
          fontWeight: "600",
        },
        drawerItemStyle: {
          borderRadius: 12,
          marginVertical: 4,
          paddingHorizontal: 8,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Tasks",
          title: "My Tasks",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="dashboard"
        options={{
          drawerLabel: "Dashboard",
          title: "Analytics",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="pie-chart" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="archive"
        options={{
          drawerLabel: "Archive",
          title: "Archived Tasks",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="archive-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
