const locales = "vn-VN";
export function getDateString(date: Date) {
  return Intl.DateTimeFormat(locales, {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(date);
}
