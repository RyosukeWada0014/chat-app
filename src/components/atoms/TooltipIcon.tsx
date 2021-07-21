import React, { memo, VFC } from "react";

import { IconButton, Tooltip } from "@material-ui/core";

type Props = {
    children: React.ReactNode;
    color?: "inherit" | "primary" | "secondary" | "default" | undefined;
    onClick: () => void;
    title: string;
};

const TooltipIcon: VFC<Props> = memo((props) => {
    const { children, onClick, title, color } = props;
    return (
        <Tooltip title={title}>
            <IconButton color={color} onClick={onClick}>
                {children}
            </IconButton>
        </Tooltip>
    );
});

export default TooltipIcon;
