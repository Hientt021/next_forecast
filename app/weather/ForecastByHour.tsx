import CardComponent from "@/src/components/CardComponent";
import { date } from "@/src/lib/dayjs/date";
import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface IForecastByHour {
  data: any;
  width?: number;
  height?: number;
}

export default function ForecastByHour(props: IForecastByHour) {
  const { data, width = 100, height = 100 } = props;
  const getIconName = (params: any) => {
    const iconName = params?.weather[0]?.icon || "";
    return iconName[0] + iconName[1];
  };
  return (
    <Stack alignItems={"center"} justifyContent={"space-between"} spacing={2}>
      <Typography
        children={date.unix(data.dt).utc(false).format("hh:mm A")}
        fontWeight={600}
      />
      <Image
        width={width}
        height={height}
        alt="weather-icon"
        src={require("@/public/images/weather_icons/" +
          getIconName(data) +
          ".png")}
      />
      <Typography
        children={Math.round(data?.main?.temp) + "°"}
        variant="h6"
        fontWeight={600}
      />
    </Stack>
  );
}
