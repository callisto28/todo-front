import axios from "axios";
import { api_url } from "../config";



const postTodo = async (params: any) => {

    return axios.post(`${api_url}/todo/create`, params, params.config)
        .then((response) => {

            return response;
        });
};

const getTodo = async (config: any) => {
    return await axios.get(`${api_url}/todo`, config)
        .then((response) => {
            return response;
        })
};

const delTodo = async (id: number, config: any) => {
    return axios.delete(`${api_url}/todo/${id}`, config)
        .then((response) => {
            return response;
        })
};

const login = async (params: any) => {
    return axios.post(`${api_url}/auth/login`, params,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {

        return response;
    });
};

const signup = (params: any) => {
    return axios.post(`${api_url}/auth/signup`, params, {
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