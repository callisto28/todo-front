import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';
import { api_url } from '../config';
import { RootState } from '../store/Store';




export const todoService = createApi({
    reducerPath: `todoService`,
    baseQuery: fetchBaseQuery({
        baseUrl: `${api_url}/`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user?.access_token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),


    endpoints: (build) => ({
        postLogin: build.mutation({
            query: ({ username, password }) => ({
                url: `auth/login`,
                method: 'POST',
                body: { username, password },
                headers: {
                    "Content-Type": "application/json",
                },

            }),
        }),
        postSignup: build.mutation({
            query: ({ username, password, lastname, firstname }) => ({
                url: `auth/signup`,
                method: 'POST',
                body: { username, password, lastname, firstname },
                headers: {
                    "Content-Type": "application/json",
                },

            })

        }),

        postTodo: build.mutation({
            query: (post) => ({
                url: `todo/create`,
                method: 'POST',
                post,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${post.access_token}`,
                },
            }),
        }),
        getTodo: build.query({
            query: (get) => ({
                url: `todo/`,
                method: 'GET',
                get,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${get.access_token}`,
                },
            }),
        }),


    }),

});



export const { usePostLoginMutation, usePostSignupMutation, usePostTodoMutation, useGetTodoQuery } = todoService;









