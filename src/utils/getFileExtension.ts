export const getFileExtension = (url: string): string => {
  // Regular expression to match the file extension
  const fileExtensionRegex = /\.([^.]+)$/;

  // Extract the file extension from the URL
  const match = url.match(fileExtensionRegex);

  // If a match is found, the extension is the second element of the match array
  const fileExtension = match ? match[1] : "Unknown";

  return fileExtension.substring(0, 3);
};
