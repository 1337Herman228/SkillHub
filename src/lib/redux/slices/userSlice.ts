"use client";

import { IUser } from "@/interfaces/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    user: IUser | null;
}

const initialState: IInitialState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
