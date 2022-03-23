import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import { api_url } from '../config';
import { RootState } from '../store/Store';


export const todoService = createApi({

    baseQuery: fetchBaseQuery({
        baseUrl: `${api_url}/`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user?.access_token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json')
            return headers;
        },
    }),

    reducerPath: `todoService`,
    tagTypes: ['todo', 'User'],


    endpoints: (build) => ({

        postSignup: build.mutation({

            query: (body: { username: string, password: string, lastname: string, firstname: string }) => ({
                url: `auth/signup`,
                method: 'POST',
                body,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ['User'],
        }),

        postLogin: build.mutation({
            query: (body: { username: string, password: string }) => ({
                url: `auth/login`,
                method: 'POST',
                body,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ['User'],
        }),

        getTodo: build.query({
            query: () => `todo/`,
            providesTags: ['todo'],
        }),

        postTodo: build.mutation({
            query: (body: { title: string, description: string, completed: boolean }) => ({
                url: `todo/create`,
                method: 'POST',
                body,
                // headers: {
                //     "Content-Type": "application/json",
                // },

            }),
            invalidatesTags: ['todo'],
        }),

        delTodo: build.mutation({
            query: (id: number) => ({
                url: `todo/${id}`,
                method: 'DELETE',
                // headers: {
                //     "Content-Type": "application/json",
                // },

            }),
            invalidatesTags: ['todo'],
        }),
    }),


});



export const { usePostLoginMutation, usePostSignupMutation, usePostTodoMutation, useGetTodoQuery, useDelTodoMutation } = todoService;









