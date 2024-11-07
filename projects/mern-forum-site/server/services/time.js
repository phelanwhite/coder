export const getReadTimeToString = (words) => {
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(words?.split(" ").length / wordsPerMinute);
  return readingTime + " minutes";
};
