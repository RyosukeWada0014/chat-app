import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import { fetchRooms } from "./features/room/roomSlice";
import { login, logout } from "./features/user/userSlice";
import { auth } from "./firebase";
import Router from "./router/Router";

const App: React.FC = () => {
    const dispatch = useDispatch();

    //ログインしているユーザーがいる場合は、storeにfirebaseのユーザー情報をセットする
    useEffect(() => {
        const unSub = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(
                    login({
                        uid: authUser.uid,
                        photoUrl: authUser.photoURL,
                        displayName: authUser.displayName,
                    })
                );
            } else {
                dispatch(logout());
            }
        });
        return () => unSub();
    }, [dispatch]);

    //firebase上のroomのデータをstoreにセットする
    useEffect(() => {
        const getData = () => {
            dispatch(fetchRooms());
        };
        getData();
    }, [dispatch]);

    return (
        <>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </>
    );
};

export default App;
