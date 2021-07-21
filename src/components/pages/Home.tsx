import React, { memo, VFC } from "react";

import RoomCreateForm from "../organisms/room/RoomCreateForm";
import RoomList from "../organisms/room/RoomList";

const Home: VFC = memo(() => {
    return (
        <>
            <RoomCreateForm />
            <RoomList />
        </>
    );
});

export default Home;
