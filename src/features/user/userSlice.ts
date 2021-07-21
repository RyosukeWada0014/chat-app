import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type UserState = {
    user: {
        uid: string;
        photoUrl: string;
        displayName: string;
    };
}

const initialState: UserState = {
    user: {
        uid: "",
        photoUrl: "",
        displayName: "",
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = { uid: "", photoUrl: "", displayName: "" };
        },
        updateUserProfile: (state, action) => {
            state.user.displayName = action.payload.displayName;
            state.user.photoUrl = action.payload.photoUrl;
        },
    },
});

export const { login, logout, updateUserProfile } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
