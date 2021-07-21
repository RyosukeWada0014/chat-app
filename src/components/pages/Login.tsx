import React, { memo, useCallback, useState, VFC } from "react";
import { useDispatch } from "react-redux";

import {
    Box,
    Button,
    Container,
    IconButton,
    TextField,
    Typography,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import styles from "./Login.module.scss";
import { useSignIn } from "../../hooks/auth/useSignIn";
import { useSignUp } from "../../hooks/auth/useSignUp";
import { setSnackBar } from "../../features/snackBarSlice";
import ShowMessage from "../organisms/modal/ShowMessage";
import ResetModal from "../organisms/modal/ResetModal";

const Login: VFC = memo(() => {
    const dispatch = useDispatch();
    const { signIn } = useSignIn();
    const { signUp, isLogin, setIsLogin } = useSignUp();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [avatarImage, setAvatarImage] = useState<File | null>(null);
    const [openModal, setOpenModal] = useState(false);

    //選択された画像があれば、最初の1つだけをstateに設定
    const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0]) {
            setAvatarImage(e.target.files![0]);
            e.target.value = "";
        }
    };
    //入力されたアドレス、パスワードによりログイン可否判定
    const onClickSignIn = () => signIn(email, password);

    //入力された情報をもとにアカウントの作成
    const onClickSignUp = () => {
        signUp(email, password, username, avatarImage);
        setAvatarImage(null);
        setEmail("");
        setPassword("");
    };

    const onClickModalClose = useCallback(() => {
        setOpenModal(false);
    }, [setOpenModal]);

    return (
        <>
            <div className={styles.root}>
                <Container
                    className={styles.container}
                    component="main"
                    maxWidth="xs"
                >
                    <div className={styles.title_container}>
                        <h1>Money Hackチャット</h1>
                        <h3>お金に役立つ情報をみんなで共有しよう</h3>
                    </div>
                    <Typography component="h1" variant="h5">
                        {isLogin ? "ログイン" : "新規アカウント作成"}
                    </Typography>
                    <form className={styles.form}>
                        {!isLogin && (
                            <>
                                <TextField
                                    autoComplete="username"
                                    fullWidth
                                    id="username"
                                    label="ユーザーネーム"
                                    margin="normal"
                                    name="username"
                                    required
                                    value={username}
                                    variant="outlined"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setUsername(e.target.value)}
                                />
                                <Box textAlign="center">
                                    <IconButton>
                                        <label>
                                            <AccountCircleIcon
                                                fontSize="large"
                                                className={
                                                    avatarImage
                                                        ? styles.login_addIconLoaded
                                                        : styles.login_addIcon
                                                }
                                            />
                                            <input
                                                id="avatar"
                                                style={{ display: "none" }}
                                                type="file"
                                                onChange={onChangeImageHandler}
                                            />
                                        </label>
                                    </IconButton>
                                    <p className={styles.user_icon_text}>
                                        <label
                                            className={styles.user_icon_label}
                                            htmlFor="avatar"
                                        >
                                            ユーザーアイコンを選択して下さい
                                        </label>
                                    </p>
                                </Box>
                            </>
                        )}
                        <TextField
                            autoComplete="email"
                            fullWidth
                            id="email"
                            label="メールアドレス"
                            margin="normal"
                            name="email"
                            required
                            value={email}
                            variant="outlined"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setEmail(e.target.value)}
                        />
                        <TextField
                            autoComplete="current-password"
                            fullWidth
                            id="password"
                            label="パスワード(半角英数6文字以上)"
                            margin="normal"
                            name="password"
                            required
                            type="password"
                            value={password}
                            variant="outlined"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPassword(e.target.value)}
                        />
                        <Button
                            className={styles.login_button}
                            fullWidth
                            variant="contained"
                            onClick={
                                isLogin
                                    ? async () => {
                                          try {
                                              await onClickSignIn();
                                          } catch (err) {
                                              dispatch(
                                                  setSnackBar({
                                                      snackBarText:
                                                          "ログインに失敗しました",
                                                      snackBarOpen: true,
                                                      snackBarType: "error",
                                                  })
                                              );
                                          }
                                      }
                                    : async () => {
                                          try {
                                              await onClickSignUp();
                                          } catch (err) {
                                              dispatch(
                                                  setSnackBar({
                                                      snackBarText:
                                                          "アカウントの作成に失敗しました",
                                                      snackBarOpen: true,
                                                      snackBarType: "error",
                                                  })
                                              );
                                          }
                                      }
                            }
                        >
                            {isLogin ? "ログイン" : "アカウント作成"}
                        </Button>
                        <Button
                            className={styles.new_account_button}
                            fullWidth
                            variant="contained"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin
                                ? "新しいアカウントを作成"
                                : "ログインに戻る"}
                        </Button>
                        <Box display="flex" justifyContent="center">
                            <p
                                onClick={() => setOpenModal(true)}
                                className={styles.reset_password}
                            >
                                パスワードを忘れた場合
                            </p>
                        </Box>
                    </form>
                </Container>
            </div>
            <ShowMessage />
            <ResetModal
                openModal={openModal}
                onClickModalClose={onClickModalClose}
            />
        </>
    );
});

export default Login;
