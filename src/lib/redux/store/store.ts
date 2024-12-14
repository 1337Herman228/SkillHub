"use client";

import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import userSlice from "../slices/userSlice";
import courseSlice from "../slices/courseSlice";
import userProgressSlice from "../slices/userProgressSlice";
import sessionSlice from "../slices/sessionSlice";

export const makeStore = () =>
    configureStore({
        reducer: {
            user: userSlice,
            course: courseSlice,
            userProgress: userProgressSlice,
            session: sessionSlice,
        },
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
