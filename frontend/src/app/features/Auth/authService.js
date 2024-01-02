import axios from "axios";
const API_URL = "http://localhost:5000/api/admins/";

// Signup admin
const signup = async (data) => {
  const response = await axios.post(API_URL, data);

  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
  }

  console.log(response);

  return response.data;
};

// Login admin
const login = async (data) => {
  console.log(data);
  const response = await axios.post(API_URL + "login", data);

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
