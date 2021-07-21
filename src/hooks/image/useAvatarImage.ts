import { useDispatch } from "react-redux";

import { storage } from "../../firebase";
import { updateUserProfile } from "../../features/user/userSlice";
import { useCreateFileName } from "./useCreateFileName";

export const useAvatarImage = () => {
    const dispatch = useDispatch();
    const { createFileName } = useCreateFileName();

    //入力されたユーザーネームとアバター画像をstorageに保存、ユーザープロフィールの更新
    const createAvatarImage = async (
        username: string,
        avatarImage: File | null,
        authUser: any
    ) => {
        let url = "";
        if (avatarImage) {
            const fileName = createFileName(avatarImage);
            await storage.ref(`avatars/${fileName}`).put(avatarImage);
            url = await storage.ref("avatars").child(fileName).getDownloadURL();
        }
        await authUser.user?.updateProfile({
            displayName: username,
            photoURL: url,
        });
        dispatch(
            updateUserProfile({
                displayName: username,
                photoUrl: url,
            })
        );
    };
    return { createAvatarImage };
};
