import { jwtDecode } from "jwt-decode";

export function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    // decoded.exp là thời gian hết hạn (tính bằng Giây)
    // Date.now() là thời gian hiện tại (tính bằng Mili-giây) -> phải chia 1000
    const currentTime = Date.now() / 1000;

    // Nếu thời gian hết hạn < thời gian hiện tại -> Token đã chết
    if (decoded.exp < currentTime) {
      // Tiện tay xóa luôn cho sạch
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }

    return true; // Token còn sống
  } catch (error) {
    return false; // Token bị lỗi format
  }
}
