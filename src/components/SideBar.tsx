"use client";
import { Box, BoxProps, Stack, Typography } from "@mui/material";
import CardComponent from "./CardComponent";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import AirIcon from "@mui/icons-material/Air";
import Link from "next/link";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapIcon from "@mui/icons-material/Map";
import SettingsIcon from "@mui/icons-material/Settings";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { usePathname } from "next/navigation";
type ISideBar = BoxProps;
const sideBar = [
  {
    label: "Weather",
    value: "/weather",
    icon: <WbCloudyIcon />,
  },
  {
    label: "Cities",
    value: "/cities",
    icon: <LocationCityIcon />,
  },
  {
    label: "Map",
    value: "/map",
    icon: <MapIcon />,
  },
  // {
  //   label: "Settings",
  //   value: "/settings",
  //   icon: <SettingsIcon />,
  // },
];

export default function SideBar(props: ISideBar) {
  const { sx, children } = props;
  const pathname = usePathname();
  return (
    <CardComponent sx={{ p: 2, pt: 4 }}>
      <Box display="flex" justifyContent={"center"} p={1} borderRadius={3}>
        <BeachAccessIcon fontSize="large" />
      </Box>

      <Stack spacing={5} mt={5}>
        {sideBar.map((el) => (
          <Link href={el.value} key={el.value}>
            <Stack
              spacing={1}
              alignItems={"center"}
              sx={{
                opacity: pathname === el.value ? 1 : 0.3,
              }}
            >
              {el.icon}
              <Typography children={el.label} fontWeight={600} />
            </Stack>
          </Link>
        ))}
      </Stack>
    </CardComponent>
  );
}
