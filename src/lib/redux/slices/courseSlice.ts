import { ICourseInfo, ICourseInfoNullable, IUser } from "@/interfaces/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICourseInfoNullable = {
    course: null,
    info: null,
    chapters: null,
    lessons: null,
};

export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setCourseState: (state, action: PayloadAction<ICourseInfo>) => {
            state.course = action.payload.course;
            state.info = action.payload.info;
            state.chapters = action.payload.chapters;
            state.lessons = action.payload.lessons;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setCourseState } = courseSlice.actions;

export default courseSlice.reducer;
