import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { api_url } from "../config";

// const token = localStorage.getItem("token");

const storeToken = async (value: string) => {
  try {
    await AsyncStorage.setItem("token", value)
  } catch (e) {
    console.log(e)
  }
}




const signup = (params: any) => {
  return axios.post(`${api_url}/auth/signup`, params, {

  });
};

const login = (params: any) => {
  return axios.post(`http://localhost:3022/auth/login`, params, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + storeToken,
    },
  }).then((response) => {
    if (response) {
      AsyncStorage.setItem("token", JSON.stringify(response));
    }
    return response;
  });
};



const logout = () => {
  localStorage.removeItem("user");
};

const AuthUsers = {
  signup,
  login,
  logout,
};
export default AuthUsers;
