export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
