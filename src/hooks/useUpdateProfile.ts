import { useDispatch, useSelector } from "react-redux";

import firebase from "firebase/app";
import { setSnackBar } from "../features/snackBarSlice";
import { selectUser, updateUserProfile } from "../features/user/userSlice";
import { useAvatarImage } from "./image/useAvatarImage";

export const useUpdateProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const { createAvatarImage } = useAvatarImage();

    const updateProfile = async (
        updateUsername: string,
        updateAvatarImage: File | null
    ) => {
        const currentUser = firebase.auth().currentUser;
        createAvatarImage(updateUsername, updateAvatarImage, currentUser);
        if (!updateAvatarImage) {
            await currentUser?.updateProfile({
                displayName: updateUsername,
            });
            dispatch(
                updateUserProfile({
                    displayName: updateUsername,
                    photoUrl: user.photoUrl,
                })
            );
        }
        dispatch(
            setSnackBar({
                snackBarText: "プロフィールを更新しました",
                snackBarOpen: true,
                snackBarType: "success",
            })
        );
    };
    return { updateProfile };
};
