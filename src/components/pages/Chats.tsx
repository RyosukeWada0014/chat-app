import React, { memo, useEffect, useState, VFC } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./Chats.module.scss";
import { db } from "../../firebase";
import ChatItem from "../organisms/chat/ChatItem";
import ChatCreateForm from "../organisms/chat/ChatCreateForm";

import { selectUser } from "../../features/user/userSlice";
import ChatRoomTitle from "../molecules/chat/ChatRoomTitle";

export type ChatType = {
    id: string;
    uid: string;
    avatar: string;
    image: string;
    text: string;
    timestamp: any;
    username: string;
};

export type ParamType = {
    roomId: string;
};

const Chats: VFC = memo(() => {
    const [chats, setChats] = useState<Array<ChatType>>([]);
    const user = useSelector(selectUser);
    const { roomId } = useParams<ParamType>();

    //チャットルームのIDをもとに、選択されたIDのチャットルーム情報をfirebaseから取得
    useEffect(() => {
        const unSub = db
            .collection("rooms")
            .doc(`${roomId}`)
            .collection("posts")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) =>
                setChats(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        uid: doc.data().uid,
                        avatar: doc.data().avatar,
                        image: doc.data().image,
                        text: doc.data().text,
                        timestamp: doc.data().timestamp,
                        username: doc.data().username,
                    }))
                )
            );
        return () => unSub();
    }, [roomId, user.uid]);

    //新規でチャットが追加された際に、そのチャットが見えるよう自動スクロール
    useEffect(() => {
        const scrollArea = document.getElementById("scroll-area");
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight;
        }
    });

    return (
        <>
            <ChatRoomTitle />
            <div className={styles.root} id="scroll-area">
                <div className={styles.chat_list}>
                    {chats.map((chat, index) => (
                        <ChatItem
                            key={chat.id}
                            index={index}
                            id={chat.id}
                            uid={chat.uid}
                            avatar={chat.avatar}
                            image={chat.image}
                            text={chat.text}
                            timestamp={chat.timestamp}
                            username={chat.username}
                        />
                    ))}
                </div>
            </div>
            <ChatCreateForm />
        </>
    );
});

export default Chats;
