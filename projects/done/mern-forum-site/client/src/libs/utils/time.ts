const locales = `vn-VN`;

export const getDateTimeLocalToString = (date: Date) => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzoffset).toISOString().slice(0, -8);
};
export const getReadTimeToString = (words: string) => {
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(words?.split(" ").length / wordsPerMinute);
  return readingTime;
};

export const getTimeDisplay = (date: Date) => {
  return new Intl.DateTimeFormat(locales, {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(date);
};
