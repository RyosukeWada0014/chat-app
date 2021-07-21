import React, { memo, VFC } from "react";
import { useSelector } from "react-redux";

import styles from "./RoomList.module.scss";
import { selectRooms } from "../../../features/room/roomSlice";
import RoomItems from "../../molecules/room/RoomItems";

const RoomList: VFC = memo(() => {
    const rooms = useSelector(selectRooms);

    //storeで保持されているチャットルームを一覧で表示
    return (
        <div className={styles.root}>
            {rooms.map((room) => (
                <RoomItems key={room.id} room={room} />
            ))}
        </div>
    );
});

export default RoomList;
