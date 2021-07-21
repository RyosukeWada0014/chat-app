import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import styles from "./RoomItems.module.scss";
import { selectRoom } from "../../../features/room/roomSlice";

type Props = {
    room: { id: string; title: string; creator: string };
};

const RoomItems: React.FC<Props> = memo((props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { room } = props;

    //クリックされてチャットルームをstoreに保存し、そのチャットルームへ画面遷移
    const onClickRoom = () => {
        dispatch(selectRoom(room));
        history.push(`/home/${room.id}`);
    };

    return (
        <div className={styles.root}>
            <List className={styles.room_list}>
                <ListItem>
                    <ListItemText
                        onClick={onClickRoom}
                        primary={room.title}
                        secondary={`作成者:${room.creator}`}
                    />
                </ListItem>
            </List>
        </div>
    );
});

export default RoomItems;
