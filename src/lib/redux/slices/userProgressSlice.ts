import { IUserProgress } from "@/components/navbars/course-navbar/course-progress/CourseProgress";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserProgress = {
    progressInPercents: 0,
    completedLessonsCount: 0,
    allLessonsCount: 0,
};

export const userProgressSlice = createSlice({
    name: "userProgress",
    initialState,
    reducers: {
        setUserProgressState: (state, action: PayloadAction<IUserProgress>) => {
            state.progressInPercents = action.payload.progressInPercents;
            state.completedLessonsCount = action.payload.completedLessonsCount;
            state.allLessonsCount = action.payload.allLessonsCount;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUserProgressState } = userProgressSlice.actions;

export default userProgressSlice.reducer;
