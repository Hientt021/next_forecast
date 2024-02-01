"use client";
import { Box } from "@mui/material";
import { GREETING } from "../weather/const";
import { date } from "@/src/lib/dayjs/date";
import AirIcon from "@mui/icons-material/Air";
import MapIcon from "@mui/icons-material/Map";
import HistoryIcon from "@mui/icons-material/History";
import { usePathname } from "next/navigation";
import Link from "next/link";
export const ROUTERS = [
  {
    label: "Weather",
    href: "/weather",
    icon: <AirIcon />,
  },
  {
    label: "Map",
    href: "/map",
    icon: <MapIcon />,
  },
  {
    label: "History",
    href: "/history",
    icon: <HistoryIcon />,
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const mainTheme = GREETING.find(
    (el) => Number(date().format("HH")) >= el.hour
  );
  return (
    <Box
      px={3}
      py={2}
      sx={{
        background: "transparent",
        display: "flex",
        gap: 2,
        fontWeight: 600,
      }}
    >
      {ROUTERS.map((el) => (
        <Link key={el.href} href={el.href}>
          <Box
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
            sx={{
              padding: 1,
              background: pathname === el.href ? "#E3F1FF" : "transparent",
              borderRadius: 4,
              cursor: "pointer",
              color: pathname === el.href ? "#000" : "#fff",
            }}
          >
            {el.icon}
            {el.label}
          </Box>
        </Link>
      ))}
    </Box>
  );
}
