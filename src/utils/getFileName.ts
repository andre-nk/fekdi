export function getFileName(url: string): string {
  // Split the URL by the forward slash (/)
  const urlParts = url.split("/");

  // Find the index of the 'o' segment (object name segment)
  const objectNameIndex = urlParts.indexOf("o");

  // Check if the 'o' segment exists
  if (objectNameIndex === -1) {
    throw new Error("Invalid Firebase Storage URL");
  }

  // Get the object name (file path)
  const objectName = urlParts[objectNameIndex + 1];

  // Decode the URL-encoded object name
  const decodedObjectName = decodeURIComponent(objectName);

  // Split the decoded object name by the question mark (?)
  const fileNameParts = decodedObjectName.split("?");

  // Get the first part, which is the file name without any query parameters
  const fileName = fileNameParts[0];

  return fileName;
}
