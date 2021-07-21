import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { selectSnackBar, setSnackBar } from "../../../features/snackBarSlice";

//ログインの成功、失敗等のメッセージ
const ShowMessage = () => {
    const dispatch = useDispatch();
    const snackBar = useSelector(selectSnackBar);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(
            setSnackBar({
                snackBarText: "",
                snackBarOpen: false,
                snackBarType: snackBar.snackBarType,
            })
        );
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackBar.snackBarOpen}
                autoHideDuration={2500}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={snackBar.snackBarType}>
                    {snackBar.snackBarText}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ShowMessage;
