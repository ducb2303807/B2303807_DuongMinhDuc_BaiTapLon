export function formatDate(dateString) {
  if (!dateString) return "---"; // Trả về --- nếu null
  const date = new Date(dateString);
  // 'vi-VN' sẽ tự động format thành dd/mm/yyyy
  return date.toLocaleDateString("vi-VN");
}
