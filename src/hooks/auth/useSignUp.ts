import { useState } from "react";
import { useDispatch } from "react-redux";

import { auth } from "../../firebase";
import { setSnackBar } from "../../features/snackBarSlice";
import { useAvatarImage } from "../image/useAvatarImage";
import { useTestEmailFormat } from "../useTestEmailFormat";

export const useSignUp = () => {
    const dispatch = useDispatch();
    const { createAvatarImage } = useAvatarImage();
    const { isValidEmailFormat } = useTestEmailFormat();
    const [isLogin, setIsLogin] = useState(true);


    //入力されたものにバリデーションをかけ、正しければ新規ユーザを作成しログイン画面に戻る
    const signUp = async (
        email: string,
        password: string,
        username: string,
        avatarImage: File | null
    ) => {
        if (!email || !password || !username) {
            dispatch(
                setSnackBar({
                    snackBarText: "必須項目が未入力です",
                    snackBarOpen: true,
                    snackBarType: "error",
                })
            );
            return false;
        }

        if (!isValidEmailFormat(email)) {
            dispatch(
                setSnackBar({
                    snackBarText: "メールアドレスの形式が正しくありません",
                    snackBarOpen: true,
                    snackBarType: "error",
                })
            );
            return false;
        }

        if (password.length < 6) {
            dispatch(
                setSnackBar({
                    snackBarText: "パスワードは6文字以上で入力して下さい",
                    snackBarOpen: true,
                    snackBarType: "error",
                })
            );
            return false;
        }

        const authUser = await auth.createUserWithEmailAndPassword(
            email,
            password
        );
        createAvatarImage(username, avatarImage, authUser);
        if (authUser) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
        dispatch(
            setSnackBar({
                snackBarText: "新規アカウントを作成しました",
                snackBarOpen: true,
                snackBarType: "success",
            })
        );
    };
    return { signUp, isLogin, setIsLogin };
};
