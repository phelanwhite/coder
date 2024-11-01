const locales = "vn-VN";

export const getDateTimeString = ({ date }: { date: Date }) => {
  return Intl.DateTimeFormat(locales, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
