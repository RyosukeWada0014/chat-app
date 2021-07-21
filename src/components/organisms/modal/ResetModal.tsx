import React, { memo, useState, VFC } from "react";

import {
    Button,
    IconButton,
    Modal,
    TextField,
    Tooltip,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import styles from "./ResetModal.module.scss";
import useResetPasswordEmail from "../../../hooks/useResetPasswordEmail";


type Props = {
    openModal: boolean;
    onClickModalClose: () => void;
};

const ResetModal: VFC<Props> = memo((props) => {
    const { openModal, onClickModalClose } = props;
    const [resetEmail, setResetEmail] = useState("");

    const { sendResetEmail } = useResetPasswordEmail();

    //入力されたアドレスにパスワード再設定用のメールを送信
    const onClickSendResetEmail = () => {
        sendResetEmail(resetEmail);
        onClickModalClose();
        setResetEmail("");
    };

    return (
        <Modal
            className={styles.root}
            open={openModal}
            onClose={onClickModalClose}
        >
            <div className={styles.modal_content}>
                <div className={styles.modal_title}>
                    <p>
                        入力されたメールアドレスに
                        <br />
                        パスワード再設定のご案内を送信します
                    </p>
                </div>
                <form className={styles.mailAddress_form}>
                    <TextField
                        autoFocus
                        className={styles.text_field}
                        label="メールアドレス"
                        name="email"
                        required
                        type="email"
                        value={resetEmail}
                        variant="outlined"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setResetEmail(e.target.value)
                        }
                    />
                    <Tooltip title="送信">
                        <IconButton
                            className={
                                resetEmail
                                ? styles.able_sendIcon
                                : styles.disable_sendIcon
                            }
                            onClick={onClickSendResetEmail}
                        >
                            <span>
                                <SendIcon />
                            </span>
                        </IconButton>
                    </Tooltip>
                </form>
                <Button
                    color="default"
                    variant="contained"
                    onClick={onClickModalClose}
                >
                    戻る
                </Button>
            </div>
        </Modal>
    );
});

export default ResetModal;
