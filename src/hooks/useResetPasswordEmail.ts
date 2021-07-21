import { useDispatch } from "react-redux";

import { setSnackBar } from "../features/snackBarSlice";
import { auth } from "../firebase";
import { useTestEmailFormat } from "./useTestEmailFormat";

export const useResetPasswordEmail = () => {
    const dispatch = useDispatch();
    const { isValidEmailFormat } = useTestEmailFormat();

    //入力されたアドレスにバリデーションを行い、パスワードリセット用のメールを送信
    const sendResetEmail = async (resetEmail: string) => {
        if (!resetEmail) {
            dispatch(
                setSnackBar({
                    snackBarText: "メールアドレスが未入力です",
                    snackBarOpen: true,
                    snackBarType: "error",
                })
            );
            return false;
        }

        if (!isValidEmailFormat(resetEmail)) {
            dispatch(
                setSnackBar({
                    snackBarText: "メールアドレスの形式が正しくありません",
                    snackBarOpen: true,
                    snackBarType: "error",
                })
            );
            return false;
        }

        await auth
            .sendPasswordResetEmail(resetEmail)
            .then(() => {
                dispatch(
                    setSnackBar({
                        snackBarText:
                            "パスワード再設定用のメールを送信しました",
                        snackBarOpen: true,
                        snackBarType: "success",
                    })
                );
            })
            .catch(() => {
                dispatch(
                    setSnackBar({
                        snackBarText:
                            "パスワード再設定用のメールの送信に失敗しました",
                        snackBarOpen: true,
                        snackBarType: "error",
                    })
                );
            });
    };
    return { sendResetEmail };
};

export default useResetPasswordEmail;
