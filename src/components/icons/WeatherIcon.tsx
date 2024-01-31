import { IDayForecastList } from "@/app/(dashboard)/weather/type";
import { iconCode } from "@/src/const/icon";
import Image from "next/image";

interface IWeatherIcon {
  size: number;
  code: number;
}
export default function WeatherIcon(props: IWeatherIcon) {
  const { code, size } = props;
  const getIcon = (code: number) => {
    return iconCode.find((el) => el.code === code)?.icon.toString();
  };
  return (
    <Image
      alt="day_weather_icon"
      src={require(`@/public/images/weather/day/${getIcon(code)}.png`)}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
