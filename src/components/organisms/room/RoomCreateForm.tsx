import React, { memo, useState, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, TextField } from "@material-ui/core";

import styles from "./RoomCreateForm.module.scss";
import { db } from "../../../firebase";
import firebase from "firebase/app";
import { fetchRooms } from "../../../features/room/roomSlice";
import { selectUser } from "../../../features/user/userSlice";

const RoomCreateForm: VFC = memo(() => {
    const [roomName, setRoomName] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    //入力されたチャットルーム名、作成日時、作成者をfirebaseに追加
    const onClickCreateRoom = () => {
        db.collection("rooms").add({
            roomName,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            creator: user.displayName,
        });
        setRoomName("");
        dispatch(fetchRooms());
    };

    return (
        <div className={styles.root}>
            <TextField
                autoFocus
                className={styles.text_field}
                label="新規チャットルーム作成"
                id="outlined-basic"
                size="medium"
                placeholder="チャットルーム名"
                value={roomName}
                variant="outlined"
                onChange={(e) => setRoomName(e.target.value)}
            />
            <div>
                <Button
                    className={styles.create_button}
                    disabled={!roomName}
                    variant="contained"
                    size="large"
                    onClick={onClickCreateRoom}
                >
                    作成
                </Button>
            </div>
        </div>
    );
});

export default RoomCreateForm;
