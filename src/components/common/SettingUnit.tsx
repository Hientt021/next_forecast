"use client";
import Dropdown from "@/src/components/common/Dropdown";
import SettingsIcon from "@mui/icons-material/Settings";
import IconComponent from "../icons";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/store";
import useUnit from "@/src/hook/useUnit";
import Menu from "./Menu";
import {
  PRECIPITATION_UNIT,
  RADAR_UNIT,
  TEMPERATURE_UNIT,
  WIND_UNIT,
} from "@/src/const/unit";
import { setUnit } from "@/src/lib/redux/features/app/appSlice";
import { IUnit } from "@/app/(dashboard)/weather/type";

interface ISettingUnit {}

export default function SettingUnit(props: ISettingUnit) {
  const { unit } = useUnit();
  const { temperature } = unit;
  const dispatch = useAppDispatch();
  const units = [
    {
      id: "temperature",
      label: "Temperature",
      icon: <IconComponent name={"temperature"} />,
      units: TEMPERATURE_UNIT,
    },
    {
      id: "precipitation",
      label: "Precipitation",
      icon: <IconComponent name={"precipitation"} />,
      units: PRECIPITATION_UNIT,
    },
    {
      id: "pressure",
      label: "Air Pressure",
      icon: <IconComponent name={"pressure"} />,
      units: PRECIPITATION_UNIT,
    },
    {
      id: "radar",
      label: "Radar",
      icon: <IconComponent name={"radar"} />,
      units: RADAR_UNIT,
    },
    {
      id: "wind",
      label: "Wind Speed",
      icon: <IconComponent name={"wind"} />,
      units: WIND_UNIT,
    },
  ];

  const handleUnitChange = (value: any, type: keyof typeof unit) => {
    if (unit[type] !== value) dispatch(setUnit({ type: type, value: value }));
  };

  const renderAction = (type: keyof typeof unit, list: any) => {
    const listValue = Object.keys(list).map((key) => ({
      value: list[key],
      label: list[key],
    }));
    return (
      <Dropdown
        onValueChange={(value) => handleUnitChange(value, type)}
        value={unit[type]}
        options={listValue}
      >
        {unit[type]}
      </Dropdown>
    );
  };

  return (
    <Menu
      label="Setting Units"
      options={units.map((el) => {
        return {
          ...el,
          action: renderAction(el.id as keyof typeof unit, el.units),
        };
      })}
    >
      <SettingsIcon sx={{ color: "white" }} />
    </Menu>
  );
}
