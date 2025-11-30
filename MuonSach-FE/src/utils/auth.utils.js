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
