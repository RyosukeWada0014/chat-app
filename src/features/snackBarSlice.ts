import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type snackBarState = {
    snackBar: {
        snackBarText: string;
        snackBarOpen: boolean;
        snackBarType: "error" | "info" | "success" | "warning" | undefined;
    };
};

const initialState: snackBarState = {
    snackBar: {
        snackBarText: "",
        snackBarOpen: false,
        snackBarType: undefined,
    },
};

export const snackBarSlice = createSlice({
    name: "snackBar",
    initialState,
    reducers: {
        setSnackBar: (state, action) => {
            state.snackBar = action.payload;
        },
    },
});

export const { setSnackBar } = snackBarSlice.actions;

export const selectSnackBar = (state: RootState) => state.snackBar.snackBar;

export default snackBarSlice.reducer;
