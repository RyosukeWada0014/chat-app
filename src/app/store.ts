import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import roomReducer from "../features/room/roomSlice";
import snackBarReducer from "../features/snackBarSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        room: roomReducer,
        snackBar: snackBarReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
