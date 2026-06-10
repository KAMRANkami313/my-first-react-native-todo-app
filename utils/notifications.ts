import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  // 1. SKIP FOR WEB
  if (Platform.OS === "web") return;

  // 2. ONLY ASK FOR PERMISSIONS (Do NOT ask for Push Token in Expo Go)
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Notification permissions not granted");
    return;
  }

  // 3. CHANNEL CONFIG (Android only)
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#6366F1",
    });
  }
}

export async function scheduleTaskNotification(
  id: string,
  title: string,
  dateString: string,
) {
  if (Platform.OS === "web") return;

  const triggerDate = new Date(dateString);
  if (triggerDate <= new Date()) return;

  await cancelTaskNotification(id);

  await Notifications.scheduleNotificationAsync({
    identifier: id,
    content: {
      title: "Task Reminder 🔔",
      body: `Don't forget: ${title}`,
      data: { taskId: id },
    },
    trigger: triggerDate as any,
  });
}

export async function cancelTaskNotification(id: string) {
  if (Platform.OS === "web") return;
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch (e) {}
}
