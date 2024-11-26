const locales = "vn-VN";
export const getDateToString = (date: string) => {
  const currentDate = new Date(date);
  return Intl.DateTimeFormat(locales, {
    month: "short",
    day: "numeric",
    year: "2-digit",
  }).format(currentDate);
};
export const getDateTimeLocalToString = (date: Date) => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzoffset).toISOString().slice(0, -8);
};
