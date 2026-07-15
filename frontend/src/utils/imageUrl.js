const BACKEND_URL = "http://localhost:5001";

export function getImageUrl(imagePath) {
  if (!imagePath) {
    return "/images/default-image.png";
  }

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://")
  ) {
    return imagePath;
  }

  if (imagePath.startsWith("/uploads/")) {
    return `${BACKEND_URL}${imagePath}`;
  }

  return imagePath;
}