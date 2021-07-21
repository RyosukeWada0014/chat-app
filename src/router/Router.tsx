import React, { memo } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Chats from "../components/pages/Chats";
import HeaderLayout from "../components/templates/layout/HeaderLayout";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import { selectRooms } from "../features/room/roomSlice";
import { selectUser } from "../features/user/userSlice";

const Router: React.FC = memo(() => {
    const rooms = useSelector(selectRooms);
    const user = useSelector(selectUser);

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                {/* ユーザーがログイン状態か判定し、ログインしていれば画面遷移*/}
                {user.uid && (
                    <Route
                        path="/home"
                        render={({ match: { url } }) => (
                            <Switch>
                                <Route exact path={`${url}`}>
                                    <HeaderLayout>
                                        <Home />
                                    </HeaderLayout>
                                </Route>
                                {rooms.map((room) => (
                                    <Route
                                        key={room.id}
                                        path={`${url}/:roomId`}
                                    >
                                        <HeaderLayout>
                                            <Chats />
                                        </HeaderLayout>
                                    </Route>
                                ))}
                            </Switch>
                        )}
                    />
                )}
            </Switch>
        </>
    );
});

export default Router;
