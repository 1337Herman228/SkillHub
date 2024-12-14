"use client";

import { IUserSession } from "@/interfaces/types";
import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    session: ExtendedSession;
    user: IUserSession;
    token: string;
}

const initialState: IInitialState = {
    session: {} as ExtendedSession,
    user: {} as IUserSession,
    token: "",
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<ExtendedSession>) => {
            state.session = action.payload;
        },
        setUser: (state, action: PayloadAction<IUserSession>) => {
            state.user = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setState: (state, action: PayloadAction<IInitialState>) => {
            state.session = action.payload.session;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setSession, setUser, setToken, setState } = sessionSlice.actions;

export default sessionSlice.reducer;
