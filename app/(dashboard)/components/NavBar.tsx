"use client";
import { Box } from "@mui/material";
import { GREETING } from "../weather/const";
import { date } from "@/src/lib/dayjs/date";
import AirIcon from "@mui/icons-material/Air";
import MapIcon from "@mui/icons-material/Map";
import HistoryIcon from "@mui/icons-material/History";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useNavigate from "@/src/hook/useNavigate";
import { useAppSelector } from "@/src/lib/redux/store";
import MenuIcon from "@mui/icons-material/Menu";
import Dropdown, { IOption } from "@/src/components/common/Dropdown";
export const ROUTERS = [
  {
    label: "Weather",
    value: "/weather",
    icon: <AirIcon />,
  },
  {
    label: "Map",
    value: "/map",
    icon: <MapIcon />,
  },
  // {
  //   label: "History",
  //   value: "/history",
  //   icon: <HistoryIcon />,
  // },
];

export default function NavBar() {
  const { query, onNavigate, pathname } = useNavigate();
  const { isMobileDevice } = useAppSelector((state) => state.app.device);
  const onNavClick = (value: string) =>
    onNavigate({
      pathname: value,
      query: {
        latitude: query?.latitude,
        longitude: query?.longitude,
      },
    });
  return (
    <Box
      px={3}
      py={2}
      sx={{
        background: "transparent",
        display: "flex",
        justifyContent: isMobileDevice ? "flex-end" : "flex-start",
        gap: 2,
        fontWeight: 600,
      }}
    >
      {isMobileDevice ? (
        <Dropdown
          label=""
          options={ROUTERS}
          value={pathname}
          onValueChange={onNavClick}
        >
          <MenuIcon sx={{ color: "white" }} />
        </Dropdown>
      ) : (
        ROUTERS.map((el) => (
          <Box
            onClick={() => onNavClick(el.value)}
            key={el.value}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
            sx={{
              padding: 1,
              background: pathname === el.value ? "#E3F1FF" : "transparent",
              borderRadius: 4,
              cursor: "pointer",
              color: pathname === el.value ? "#000" : "#fff",
            }}
          >
            {el.icon}
            {el.label}
          </Box>
        ))
      )}
    </Box>
  );
}
