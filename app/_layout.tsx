import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { TaskProvider } from "@/features/tasks/TaskContext"; // Import your new Context
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    /* 
      The TaskProvider must be at the very top level. 
      This ensures that all screens inside the Stack 
      share the same global state.
    */
    <TaskProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* Main Tab/Drawer Navigation */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Global Modal Screen */}
          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
              title: "Edit Task",
              headerStyle: {
                backgroundColor: colorScheme === "dark" ? "#0F172A" : "#fff",
              },
              headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </TaskProvider>
  );
}
