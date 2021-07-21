import React, { memo, useEffect, useState, VFC } from "react";
import { useParams } from "react-router-dom";

import styles from "./ChatRoomTitle.module.scss";
import { db } from "../../../firebase";
import { ParamType } from "../../pages/Chats";

const ChatRoomTitle: VFC = memo(() => {
    const { roomId } = useParams<ParamType>();
    const [roomTitle, setRoomTitle] = useState("");

    //初回レンダリング時に、チャットルーム名をタイトルとして表示
    useEffect(() => {
        const postRef = db.collection("rooms").doc(`${roomId}`);
        postRef.get().then((doc) => {
            if (doc.exists) {
                setRoomTitle(doc.data()!.roomName);
            }
        });
    }, [roomId]);

    return (
        <div className={styles.root}>
            <h3 className={styles.title}>{roomTitle}</h3>
        </div>
    );
});

export default ChatRoomTitle;
