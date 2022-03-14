import axios from "axios";
import { api_url } from "../config";

const userToken = localStorage.getItem("token");
const token = localStorage.getItem("token");

const config = {
    headers: {
        Authorization: "Bearer " + token,
    },
};



const postTodo = (params: any) => {
    return axios.post(`${api_url}/todo/create`, params, config)
        .then((response) => {
            console.log(response, "response todo");

            return response;
        }

        );

}


const getTodo = () => {
    return axios.get(`${api_url}/todo`, config)
        .then((response) => {
            console.log(response, "response todo");

            return response;
        })
}


const delTodo = (id: number) => {
    return axios.delete(`${api_url}/todo/${id}`, config)
        .then((response) => {
            console.log(response, "response todo");

            return response;
        })
}


const login = (params: any) => {
    return axios.post(`http://localhost:3022/auth/login`, params, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    }).then((response) => {
        if (response) {
            localStorage.setItem("token", JSON.stringify(response));
        }
        return response;
    });
};

const signup = (username: "", password: "", lastname: "", firstname: "") => {
    return axios.post(`${api_url}/auth/signup`, {
        username,
        password,
        lastname,
        firstname,
    });
};

const userService = {
    login,
    signup,
    postTodo,
    getTodo,
    delTodo,
}
export default userService;