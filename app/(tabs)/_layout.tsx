import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        // Header Styling
        headerStyle: {
          backgroundColor: "#0F172A", // Dark Slate
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 18,
        },

        // Drawer Side Menu Styling
        drawerStyle: {
          backgroundColor: "#0F172A",
          width: 280,
        },
        drawerActiveTintColor: "#6366F1", // Indigo
        drawerInactiveTintColor: "#94A3B8", // Muted Slate
        drawerActiveBackgroundColor: "rgba(99, 102, 241, 0.1)", // Subtle indigo highlight
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
      {/* 1. MAIN TASKS SCREEN */}
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Tasks", // Capitalized
          title: "My Tasks",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />

      {/* 2. DASHBOARD SCREEN */}
      <Drawer.Screen
        name="dashboard"
        options={{
          drawerLabel: "Dashboard", // Fixed Casing & Added Icon
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
      {/* 3. SETTINGS SCREEN */}
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings", // Fixed Casing & Added Icon
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
