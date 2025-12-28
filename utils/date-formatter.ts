export const formatDate = (dateString?: string) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  if (isToday) return "Today";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const isOverdue = (dateString?: string) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return date < now;
};
