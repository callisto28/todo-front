import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/**
 * Types
 */
export type TodoState = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
};
/**
 * State
 */
export const sliceName = 'todo';

const makeRoot = <T>(val: T) => ({
    [sliceName]: val,
});

export const initialState: TodoState = {
    id: 0,
    title: '',
    description: '',
    completed: false,

};


const rootInitialState = makeRoot(initialState);
export type LocalRootState = typeof rootInitialState;

/**
 * Actions
 */

const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        // type: "sliceName/setUser"
        setTodo(state: TodoState, { payload: todo }: PayloadAction<TodoState>) {
            state.title = todo.title;
            state.description = todo.description;
            state.completed = todo.completed;
        },
        // type: "sliceName/addTodo"
        addTodo(state: TodoState, { payload: todo }: PayloadAction<TodoState>) {
            state.id = todo.id;
            state.title = todo.title;
            state.description = todo.description;
            state.completed = todo.completed;
        },
        // // type: "sliceName/removeTodo"
        // removeTodo(state: TodoState, { payload: todo }: PayloadAction<TodoState>) {
        //     state.id = todo.id;
        // },
        // // type: "sliceName/toggleTodo"
        // toggleTodo(state: TodoState, { payload: todo }: PayloadAction<TodoState>) {

        //     state.id = todo.id;
        // }
    },
});


/**
 * Selectors
 */
const selectSlice = (state: LocalRootState) => state[sliceName];

export const selecTodo = (state: LocalRootState): TodoState => selectSlice(state);

export const { setTodo,
    addTodo,
    //   removeTodo
} = slice.actions;

export default makeRoot(slice.reducer);