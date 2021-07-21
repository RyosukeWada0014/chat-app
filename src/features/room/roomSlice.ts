import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { db } from "../../firebase";

type RoomState = {
    rooms: Array<{
        id: string;
        title: string;
        creator: string;
    }>;
    selectedRoom: {
        id: string;
        title: string;
        creator: string;
    };
};

const initialState: RoomState = {
    rooms: [],
    selectedRoom: { id: "", title: "", creator: "" },
};
//firebaseから、チャットルームを、作成日時の降順に全件取得する
export const fetchRooms = createAsyncThunk("room/getAllRooms", async () => {
    const res = await db.collection("rooms").orderBy("timestamp", "desc").get();

    const allRooms = res.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().roomName,
        creator: doc.data().creator,
    }));
    const passData = { allRooms };
    return passData;
});

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        selectRoom: (state, action) => {
            state.selectedRoom = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRooms.fulfilled, (state, action) => {
            state.rooms = action.payload.allRooms;
        });
    },
});

export const { selectRoom } = roomSlice.actions;

export const selectRooms = (state: RootState) => state.room.rooms;

export default roomSlice.reducer;
