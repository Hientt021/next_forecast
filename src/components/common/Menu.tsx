import {
  IconButton,
  ListItemIcon,
  Menu as MuiMenu,
  MenuItem,
  Tooltip,
  Box,
} from "@mui/material";
import { MouseEventHandler, useRef, useState } from "react";

interface IMenu {
  options: IMenuOption[];
  icon?: React.ReactNode;
  label?: string;
  value?: string;
  children?: React.ReactNode;
}

export interface IMenuOption {
  icon?: React.ReactNode;
  label: string;
  action?: React.ReactNode;
}

export default function Menu(props: IMenu) {
  const {
    value = "",
    label = "",
    icon = <></>,
    options,
    children = <></>,
  } = props;
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  const onOpen = (e: any) => setAnchor(e.currentTarget);
  const onClose = () => setAnchor(null);

  return (
    <>
      <MuiMenu
        anchorEl={anchor}
        open={open}
        onClose={onClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {options.map((el, i) => (
          <Box
            p={1}
            key={i}
            sx={{
              textTransform: "capitalize",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              color: "GrayText",
            }}
          >
            <Box>
              <ListItemIcon>{el?.icon}</ListItemIcon>
              {el.label}
            </Box>

            {el?.action}
          </Box>
        ))}
      </MuiMenu>

      <Tooltip title={label}>
        <IconButton onClick={onOpen} size="small" sx={{ ml: 2 }}>
          {icon}
          {children}
        </IconButton>
      </Tooltip>
    </>
  );
}
