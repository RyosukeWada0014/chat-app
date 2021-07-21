import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";

import { db, storage } from "../firebase";
import { ParamType } from "../components/pages/Chats";
import { useCreateFileName } from "./image/useCreateFileName";
import { selectUser } from "../features/user/userSlice";

export const useSendChat = () => {
    const user = useSelector(selectUser);
    const { roomId } = useParams<ParamType>();
    const { createFileName } = useCreateFileName();

    const sendChat = (
        chatMsg: string,
        chatImg: File | null
    ) => {
        if (chatImg) {
            const fileName = createFileName(chatImg);
            const uploadImages = storage
                .ref(`${roomId}/${fileName}`)
                .put(chatImg);
            uploadImages.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                () => {},
                (err) => alert(err.message),
                async () => {
                    await storage
                        .ref(`${roomId}`)
                        .child(fileName)
                        .getDownloadURL()
                        .then(async (url) =>
                            db
                                .collection("rooms")
                                .doc(`${roomId}`)
                                .collection("posts")
                                .add({
                                    uid: user.uid,
                                    avatar: user.photoUrl,
                                    image: url,
                                    text: chatMsg,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    username: user.displayName,
                                })
                        );
                }
            );
        } else {
            db.collection("rooms").doc(`${roomId}`).collection("posts").add({
                uid: user.uid,
                avatar: user.photoUrl,
                image: "",
                text: chatMsg,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                username: user.displayName,
            });
        }
    };
    return { sendChat };
};
