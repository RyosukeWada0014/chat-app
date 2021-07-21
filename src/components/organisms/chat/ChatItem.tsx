import React, { memo, VFC } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Avatar} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "./ChatItem.module.scss";
import { db } from "../../../firebase";
import { ChatType, ParamType } from "../../pages/Chats";
import { selectUser } from "../../../features/user/userSlice";
import TooltipIcon from "../../atoms/TooltipIcon";

const ChatItem: VFC<ChatType & { index: number }> = memo((props) => {
    const { id, index, uid, avatar, image, text, timestamp, username } = props;
    const user = useSelector(selectUser);
    const { roomId } = useParams<ParamType>();

    const onClickDelete = async () => {
        await db
            .collection("rooms")
            .doc(`${roomId}`)
            .collection("posts")
            .doc(`${id}`)
            .delete();
    };

    return (
        <div className={styles.root} id="scroll-area">
            <div className={styles.chat_avatar}>
                <Avatar src={avatar} />
            </div>
            <div className={styles.chat_body}>
                <div className={styles.chat_header}>
                    <h3>
                        <span className={styles.chat_user}>{username}</span>
                        <span className={styles.chat_time}>
                            {new Date(timestamp?.toDate()).toLocaleString()}
                        </span>
                        {uid === user.uid && (
                            <span className={styles.delete_icon}>
                                <TooltipIcon
                                    title="削除"
                                    onClick={onClickDelete}
                                >
                                    <DeleteIcon />
                                </TooltipIcon>
                            </span>
                        )}
                    </h3>
                </div>
                <div className={styles.chat_text}>
                    <p>{`${index + 1}:${text}`}</p>
                </div>
                {image && (
                    <div className={styles.chat_image}>
                        <img src={image} alt="チャット画像" />
                    </div>
                )}
            </div>
        </div>
    );
});

export default ChatItem;
