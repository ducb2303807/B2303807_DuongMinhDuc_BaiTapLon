import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";
const USER_KEY = "user";

const READER_ROLE = "reader";
const STAFF_ROLE = "staff";

export function isTokenValid() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;

  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      logout();
      return false;
    }
    return true;
  } catch (error) {
    logout();
    return false;
  }
}

export function getUserData() {
  if (!isTokenValid()) return null;

  const userStr = localStorage.getItem(USER_KEY);
  try {
    return JSON.parse(userStr);
  } catch (e) {
    logout();
    return null;
  }
}

export function getUserRole() {
  const user = getUserData();
  return user?.role || null;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isReader() {
  return getUserRole() === READER_ROLE;
}

export function isStaff() {
  return getUserRole() === STAFF_ROLE;
}

export async function isReaderUsernameAvailable(username) {
  const module = await import("@/services/reader.service");
  const ReaderService = module.default;
  // 2. Nếu không có username, coi như hợp lệ (để rule 'required' lo việc bắt lỗi trống)
  if (!username || username.trim().length === 0) return true;
  try {
    const response = await ReaderService.checkUsername({ Username: username });

    if (response && response.exists === true) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Lỗi khi check username:", error);
    return false;
  }
}

export async function isStaffUsernameAvailable(username) {
  const module = await import("@/services/staff.service");
  const StaffService = module.default;

  if (!username || username.trim().length === 0) return true;

  try {
    const response = await StaffService.checkUsername({ Username: username });

    if (response && response.exists === true) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Lỗi khi check username:", error);
    return false;
  }
}
