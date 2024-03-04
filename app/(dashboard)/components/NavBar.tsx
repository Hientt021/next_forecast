"use client";
import Dropdown from "@/src/components/common/Dropdown";
import SettingUnit from "@/src/components/common/SettingUnit";
import IconComponent from "@/src/components/icons";
import useNavigate from "@/src/hook/useNavigate";
import { useAppSelector } from "@/src/lib/redux/store";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import CitiesSearch from "../weather/components/CitiesSearch";

export const ROUTERS = [
  {
    id: "weather",
    label: "Weather",
    href: "/weather",
    icon: <IconComponent name={"weather"} />,
  },
  {
    id: "map",
    label: "Map",
    href: "/map",
    icon: <IconComponent name="map" />,
  },
];

export default function NavBar() {
  const { query, onNavigate, pathname } = useNavigate();
  const { device, location } = useAppSelector((state) => state.app);
  const { isMobileDevice } = device;
  const onNavClick = (value: string) =>
    onNavigate({
      pathname: value,
      query: {
        ...query,
        latitude: query?.latitude,
        longitude: query?.longitude,
      },
    });

  const items = {
    desktop: {
      left: ROUTERS,
      right: [
        {
          id: "search",
          icon: <CitiesSearch defaultValue={location?.name} />,
        },
        {
          id: "setting",
          icon: <SettingUnit />,
        },
      ],
    },
    mobile: {
      left: [
        {
          id: "search",
          icon: <CitiesSearch defaultValue={location?.name} />,
        },
      ],
      right: [
        {
          id: "routers",
          icon: (
            <Dropdown
              options={ROUTERS.map((el) => ({ ...el, value: el.id }))}
              value={pathname}
              onValueChange={onNavClick}
              icon={<MenuIcon sx={{ color: "white" }} />}
            />
          ),
        },
        {
          id: "setting",
          icon: <SettingUnit />,
        },
      ],
    },
  };

  const renderNavItem = (el: any) => {
    return (
      <Box
        onClick={() => el.href && onNavClick(el.href)}
        key={el.id}
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
        sx={{
          px: 1,
          py: 0.5,
          background: pathname === el.href ? "#E3F1FF" : "transparent",
          borderRadius: 4,
          cursor: "pointer",
          color: pathname === el.href ? "#000" : "#fff",
        }}
      >
        {el.icon}
        {el?.label}
      </Box>
    );
  };
  return (
    <Box
      px={3}
      py={isMobileDevice ? 0.5 : 2}
      sx={{
        background: "transparent",
        display: "flex",
        justifyContent: "space-between",
        fontWeight: 600,
      }}
    >
      <Box display="flex">
        {items[isMobileDevice ? "mobile" : "desktop"].left.map((el) =>
          renderNavItem(el)
        )}
      </Box>

      <Box display="flex">
        {items[isMobileDevice ? "mobile" : "desktop"].right.map((el) =>
          renderNavItem(el)
        )}
      </Box>
    </Box>
  );
}
