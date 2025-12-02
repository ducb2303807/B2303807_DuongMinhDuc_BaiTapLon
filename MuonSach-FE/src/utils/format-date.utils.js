export function formatDate(dateString) {
  if (!dateString) return "---";
  const date = new Date(dateString);
  // 'vi-VN' sẽ tự động format thành dd/mm/yyyy
  return date.toLocaleDateString("vi-VN");
}
