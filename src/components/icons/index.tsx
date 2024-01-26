import { Box, BoxProps } from "@mui/material";
import ClearSkyDayIcon from "./ClearSkyDayIcon";
import CityBuilding from "./CityBuilding";
import ClearSkyNightIcon from "./ClearSkyNightIcon";
import CloudyIcon from "./CloudyIcon";
import FewCloudDay from "./FewCloudDay";
import FewCloudNight from "./FewCloudNight";
import RainyDayIcon from "./RainyDayIcon";
import RainyNightIcon from "./RainyNightIcon";
import StormDayIcon from "./StormDayIcon";
import StormNightIcon from "./StormNightIcon";
import SnowDayIcon from "./SnowDayIcon";
import SnowNightIcon from "./SnowNightIcon";
import MistDayIcon from "./MistDayIcon";
import MistNightIcon from "./MistNightIcon";

const icons: { [key: string]: (props: IIconComponent) => React.ReactNode } = {
  ["city"]: (props) => <CityBuilding {...props} />,

  ["01d"]: (props) => <ClearSkyDayIcon {...props} />,
  ["01n"]: (props) => <ClearSkyNightIcon {...props} />,
  ["02d"]: (props) => <FewCloudDay {...props} />,
  ["02n"]: (props) => <FewCloudNight {...props} />,
  ["03d"]: (props) => <CloudyIcon {...props} />,
  ["03n"]: (props) => <CloudyIcon {...props} />,
  ["04d"]: (props) => <CloudyIcon {...props} />,
  ["04n"]: (props) => <CloudyIcon {...props} />,
  ["09d"]: (props) => <RainyDayIcon {...props} />,
  ["09n"]: (props) => <RainyNightIcon {...props} />,
  ["10d"]: (props) => <RainyDayIcon {...props} />,
  ["10n"]: (props) => <RainyNightIcon {...props} />,
  ["11d"]: (props) => <StormDayIcon {...props} />,
  ["11n"]: (props) => <StormNightIcon {...props} />,
  ["13d"]: (props) => <SnowDayIcon {...props} />,
  ["13n"]: (props) => <SnowNightIcon {...props} />,
  ["50d"]: (props) => <MistDayIcon {...props} />,
  ["50n"]: (props) => <MistNightIcon {...props} />,
};
type IIconName = keyof typeof icons;
export interface IIconComponent extends BoxProps {
  size?: number | string;
  color?: string;
  name: IIconName;
}

export default function IconComponent(props: IIconComponent) {
  const { name, color = "#000000", size = "auto", sx, ...rest } = props;
  return (
    <Box
      {...rest}
      width={size}
      height={size}
      sx={{
        ...sx,
        ".st0 ": {
          fill: "none",
          stroke: color,
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: 10,
        },
        ".st1": {
          fill: "none",
          stroke: color,
          strokeWidth: 2,
          strokeLinejoin: "round",
          strokeMiterlimit: 10,
        },
      }}
    >
      {icons[name](props)}
    </Box>
  );
}
