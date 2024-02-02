import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { MouseEventHandler, useRef, useState } from "react";

interface IDropdown {
  options: IOption[];
  icon: React.ReactNode;
  label?: string;
  onValueChange?: (value: string) => void;
}

export interface IOption {
  icon?: React.ReactNode;
  label: string;
  value: string;
}
export default function Dropdown(props: IDropdown) {
  const { label = "", icon, options, onValueChange } = props;
  const [value, setValue] = useState("");
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  const onOpen = (e: any) => setAnchor(e.currentTarget);
  const onClose = () => setAnchor(null);

  return (
    <>
      <Menu
        anchorEl={anchor}
        open={open}
        onClose={onClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {options.map((el, i) => (
          <MenuItem
            onClick={(e: any) => {
              const str = el.value;
              onValueChange && onValueChange(str);
              setValue(str);
              onClose();
            }}
            selected={value === el.value}
            key={i}
            value={el.value}
          >
            <ListItemIcon>{el?.icon}</ListItemIcon>
            {el.label}
          </MenuItem>
        ))}
      </Menu>

      <Tooltip title={label}>
        <IconButton onClick={onOpen} size="small" sx={{ ml: 2 }}>
          {icon}
        </IconButton>
      </Tooltip>
    </>
  );
}
