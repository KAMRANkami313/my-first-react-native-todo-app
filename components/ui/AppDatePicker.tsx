import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React from "react";
import { Platform } from "react-native";

interface Props {
  value: Date;
  onChange: (date: Date) => void;
  show: boolean;
  setShow: (show: boolean) => void;
}

export function AppDatePicker({ value, onChange, show, setShow }: Props) {
  // --- WEB VERSION ---
  if (Platform.OS === "web") {
    return (
      <input
        type="datetime-local"
        value={value.toISOString().substring(0, 16)}
        onChange={(e) => {
          const newDate = new Date(e.target.value);
          if (!isNaN(newDate.getTime())) onChange(newDate);
        }}
        style={{
          backgroundColor: "#1E293B",
          color: "#6366F1",
          padding: "8px",
          borderRadius: "10px",
          border: "1px solid #334155",
          fontSize: "14px",
          fontWeight: "bold",
          outline: "none",
          marginLeft: "10px",
        }}
      />
    );
  }

  // --- MOBILE VERSION ---
  if (!show) return null;

  const handleMobileChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    // Crucial for Android: Close the state immediately
    if (Platform.OS === "android") {
      setShow(false);
    }

    // iOS behaves better with the state remaining open during spinner scroll
    if (event.type === "dismissed") {
      setShow(false);
      return;
    }

    if (selectedDate) {
      onChange(selectedDate);
      if (Platform.OS === "ios") {
        // Keep it open for iOS spinner until they click away
      } else {
        setShow(false);
      }
    }
  };

  return (
    <DateTimePicker
      value={value}
      mode="datetime"
      is24Hour={false}
      display={Platform.OS === "ios" ? "spinner" : "default"}
      onChange={handleMobileChange}
    />
  );
}
