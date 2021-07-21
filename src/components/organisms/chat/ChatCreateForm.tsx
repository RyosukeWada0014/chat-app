import React, { memo, useState, VFC } from "react";

import { Button, IconButton } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import SendIcon from "@material-ui/icons/Send";

import styles from "./ChatCreateForm.module.scss";
import { useSendChat } from "../../../hooks/useSendChat";

const ChatCreateForm: VFC = memo(() => {
    const [chatMsg, setChatMsg] = useState("");
    const [chatImg, setChatImg] = useState<File | null>(null);
    const { sendChat } = useSendChat();

    // 選択された画像があれば、最初の1つだけをstateに設定
    const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0]) {
            setChatImg(e.target.files![0]);
            e.target.value = "";
        }
    };

    const onSubmitSendChat = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendChat(chatMsg, chatImg);
        setChatMsg("");
        setChatImg(null);
    };

    return (
        <div className={styles.root}>
            <form onSubmit={onSubmitSendChat}>
                <div className={styles.chat_form}>
                    <IconButton>
                        <label>
                            <AddAPhotoIcon
                                className={
                                    chatImg
                                        ? styles.chat_addIconLoaded
                                        : styles.chat_addIcon
                                }
                            />
                            <input
                                className={styles.chat_hiddenIcon}
                                type="file"
                                onChange={onChangeImageHandler}
                            />
                        </label>
                    </IconButton>
                    <textarea
                        autoFocus
                        className={styles.chat_input}
                        rows={1}
                        value={chatMsg}
                        wrap="soft"
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setChatMsg(e.target.value)
                        }
                    />
                    <Button
                        className={
                            chatMsg || chatImg
                                ? styles.chat_sendBtn
                                : styles.chat_sendDisableBtn
                        }
                        disabled={!chatMsg && !chatImg}
                        size="small"
                        type="submit"
                    >
                        <SendIcon />
                    </Button>
                </div>
            </form>
        </div>
    );
});

export default ChatCreateForm;
