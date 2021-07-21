import React, { memo, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";

import styles from "./Header.module.scss";
import { auth } from "../../../firebase";
import { setSnackBar } from "../../../features/snackBarSlice";
import ShowMessage from "../modal/ShowMessage";
import UpdateProfileModal from "../modal/UpdateProfileModal";
import TooltipIcon from "../../atoms/TooltipIcon";

const Header: React.FC = memo(() => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);

    const onClickHome = () => {
        history.push("/home");
    };

    const onClickAccount = () => {
        setOpenModal(true);
    };

    const onClickLogout = async () => {
        await auth.signOut();
        history.push("/");
        dispatch(
            setSnackBar({
                snackBarText: "ログアウトしました",
                snackBarOpen: true,
                snackBarType: "warning",
            })
        );
    };

    const onClickCloseModal = useCallback(() => {
        setOpenModal(false);
    }, [setOpenModal]);

    return (
        <div className={styles.root}>
            <AppBar className={styles.app_bar} position="fixed">
                <div className={styles.header_content}>
                    <Toolbar>
                        <div className={styles.typography}>
                            <Typography
                                className={styles.title_logo}
                                variant="h2"
                                onClick={onClickHome}
                            >
                                Money Hackチャット
                            </Typography>
                        </div>
                        <TooltipIcon
                            color="inherit"
                            title="チャットルーム一覧"
                            onClick={onClickHome}
                        >
                            <HomeIcon />
                        </TooltipIcon>
                        <TooltipIcon
                            color="inherit"
                            title="マイページ"
                            onClick={onClickAccount}
                        >
                            <AccountCircleIcon />
                        </TooltipIcon>
                        <TooltipIcon
                            color="inherit"
                            title="ログアウト"
                            onClick={onClickLogout}
                        >
                            <ExitToAppIcon />
                        </TooltipIcon>
                    </Toolbar>
                </div>
            </AppBar>
            <ShowMessage />
            <UpdateProfileModal
                openModal={openModal}
                onClickCloseModal={onClickCloseModal}
            />
        </div>
    );
});

export default Header;
