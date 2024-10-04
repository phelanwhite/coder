export function getDateString(date: Date) {
  return Intl.DateTimeFormat("vn-VN", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(date);
}
