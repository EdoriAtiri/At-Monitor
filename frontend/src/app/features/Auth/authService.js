import axios from "axios";

const API_URL = import.meta.env.VITE_BASEURL;

// Signup admin
const signup = async (data) => {
  const response = await axios.post(API_URL + "admins/", data);

  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
  }

  console.log(response);

  return response.data;
};

// Login admin
const login = async (data) => {
  console.log(data);
  const response = await axios.post(API_URL + "auth/login", data);

  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
  }

  console.log(response);

  return response.data;
};

// Logout admin
const logout = () => localStorage.removeItem("admin");

const authService = {
  signup,
  login,
  logout,
};

export default authService;
