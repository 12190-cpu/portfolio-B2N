import api from "../api/api";

const authService = {
  login(username, password) {
    return api.post("/auth/login", {
      username,
      password
    });
  },

  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem("token"));
  }
};

export default authService;