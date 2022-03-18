import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/**
 * Types
 */

export type UserState = {
    username: string;
    access_token: string;
};

/**
 * State
 */

export const sliceName = 'user';

const makeRoot = <T>(val: T) => ({
    [sliceName]: val,
});

export const initialState: UserState = {
    username: '',
    access_token: '',
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
        setUser(
            state: UserState,
            { payload }: PayloadAction<string | null | undefined | any>,
        ) {
            state.username = payload.username;
        },
    },
});

/**
 * Selectors
 */

const selectSlice = (state: LocalRootState) => state[sliceName];

export const selectUser = (state: LocalRootState): {} => selectSlice(state);

export const { setUser } = slice.actions;

export default makeRoot(slice.reducer);