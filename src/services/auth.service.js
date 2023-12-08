import axios from "axios";
import "../GlobalVariables";
const API_URL = global.apiUrl;
const HEADER = global.header;
const register = (data) => {
  return axios.post(API_URL + "/register", data, HEADER);
};
const login = (username, password) => {
  return axios
    .post(
      API_URL + "/user/login/",
      {
        email:username,
        password:password,
      },
      HEADER
    )
    .then((response) => {
       console.log(response);
      localStorage.setItem(
        "auth_user",response.data.token.access
      )

      localStorage.setItem(
        "token",response.data.token.access
      );
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
export default {
  register,
  login,
  logout,
};
