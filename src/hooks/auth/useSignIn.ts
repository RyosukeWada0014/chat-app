import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSnackBar } from "../../features/snackBarSlice";
import { auth } from "../../firebase";

import { useTestEmailFormat } from "../useTestEmailFormat";

export const useSignIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isValidEmailFormat } = useTestEmailFormat();

    //入力されたものにバリデーションをかけ、正しければログインしチャット一覧へ画面遷移
    const signIn = async (email: string, password: string) => {
        if (!email || !password) {
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

        await auth.signInWithEmailAndPassword(email, password);
        history.push("/home");
        dispatch(
            setSnackBar({
                snackBarText: "ログインしました",
                snackBarOpen: true,
                snackBarType: "success",
            })
        );
    };

    return { signIn };
};
