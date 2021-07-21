import React, { useState, VFC } from "react";
import { useSelector } from "react-redux";

import {
    Avatar,
    Button,
    IconButton,
    Modal,
    TextField,
} from "@material-ui/core";

import styles from "./UpdateProfileModal.module.scss";
import { selectUser } from "../../../features/user/userSlice";
import { useUpdateProfile } from "../../../hooks/useUpdateProfile";

type Props = {
    openModal: boolean;
    onClickCloseModal: () => void;
};

const UpdateProfileModal: VFC<Props> = (props) => {
    const { openModal, onClickCloseModal } = props;
    const user = useSelector(selectUser);
    const { updateProfile } = useUpdateProfile();

    const [updateAvatarImage, setUpdateAvatarImage] = useState<File | null>(
        null
    );
    const [updateUsername, setUpdateUsername] = useState(`${user.displayName}`);

    //選択された画像があれば、最初の1つだけをstateに設定
    const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0]) {
            setUpdateAvatarImage(e.target.files![0]);
            e.target.value = "";
        }
    };

    //入力された情報でユーザーネームとアバター画像を更新
    const onClickUpdateProfile = () => {
        updateProfile(updateUsername, updateAvatarImage);
        onClickCloseModal();
    };

    return (
        <Modal
            open={openModal}
            onClose={onClickCloseModal}
            className={styles.root}
        >
            <div className={styles.modal_content}>
                <h3 className={styles.modal_title}>プロフィール編集</h3>
                <div className={styles.avatar_content}>
                    <IconButton>
                        <label>
                            <Avatar
                                className={styles.avatar}
                                src={user.photoUrl}
                            />
                            <input
                                id="avatar"
                                style={{ display: "none" }}
                                type="file"
                                onChange={onChangeImageHandler}
                            />
                        </label>
                    </IconButton>
                    <p>
                        <label
                            htmlFor="avatar"
                            className={styles.avatar_select}
                        >
                            ユーザーアイコンを選択して下さい
                        </label>
                    </p>
                </div>
                <TextField
                    autoComplete="username"
                    className={styles.username_textfield}
                    defaultValue={`${user.displayName}`}
                    id="username"
                    label="ユーザーネーム"
                    margin="normal"
                    name="username"
                    variant="outlined"
                    onChange={(e) => setUpdateUsername(e.target.value)}
                />
                <Button
                    className={styles.update_button}
                    disabled={!updateUsername}
                    fullWidth
                    variant="contained"
                    onClick={onClickUpdateProfile}
                >
                    更新
                </Button>
                <Button
                    className={styles.chancel_button}
                    color="default"
                    fullWidth
                    variant="contained"
                    onClick={onClickCloseModal}
                >
                    キャンセル
                </Button>
            </div>
        </Modal>
    );
};

export default UpdateProfileModal;
