"use client";
import FetchCity from "@/src/actions/FetchCity";
import { callApi } from "@/src/api/callApi";
import {
  AIR_POLLUTION_API,
  FORECAST_API,
  UVI_API,
  WEATHER_API,
} from "@/src/api/const";
import DegreeSwitch from "@/src/components/DegreeSwitch";
import ForecastIcon from "@/src/components/ForecastIcon";
import { WEATHER_TOKEN } from "@/src/const/token";
import useUnit from "@/src/hook/useUnit";
import { addCurrentTime, date, getDayName } from "@/src/lib/dayjs/date";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../../src/components/Loader";
import CitiesSearch from "./CitiesSearch";
import WeeklyForecast from "./WeeklyForecast";
import { ICurrentForecast, IUnit } from "./type";
export interface ICoordinate {
  name?: string;
  longitude: string;
  latitude: string;
}

export default function WeatherPage() {
  const [coordinate, setCoordinate] = useState<ICoordinate>({
    longitude: "",
    latitude: "",
  });
  const [city, setCity] = useState<string>("");

  const [weeklyList, setWeeklyList] = useState<any>([]);
  const [forecast, setForecast] = useState<ICurrentForecast | undefined>(
    undefined
  );

  const { unit, formatUnit } = useUnit();
  // const dispatch = useDispatch();
  const init = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (location) => {
        const currentCoordinate = await FetchCity(location);
        if (currentCoordinate) setCoordinate(currentCoordinate);
      });
    }
  };

  function formatForecastData(data: any) {
    return {
      temp: data.main.temp,
      description: data.weather?.[0]?.description,
      icon: data.weather?.[0]?.icon,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      feels_like: data.main.feels_like,
      dt: date.unix(data.dt).utc(false).unix(),
      uvIndex: data?.uvIndex,
      airQuality: data?.airQuality,
    };
  }

  const getUnixData = async (coordinate: ICoordinate, unit: string) => {
    const currentForecast = await callApi(WEATHER_API, {
      units: unit,
      lat: coordinate?.latitude,
      lon: coordinate?.longitude,
      appid: WEATHER_TOKEN,
    });
    setCity(currentForecast.name + ", " + currentForecast?.sys?.country);

    const uvIndex = await getUvIndex(coordinate);
    const airQuality = await getAirQuality(coordinate);
    return {
      ...currentForecast,
      uvIndex: uvIndex,
      airQuality: airQuality,
    };
  };

  const getUvIndex = async (coordinate: ICoordinate) => {
    const uvIndex = await callApi(UVI_API, {
      lat: coordinate?.latitude,
      lon: coordinate?.longitude,
      appid: WEATHER_TOKEN,
    });
    return uvIndex.value;
  };

  const getAirQuality = async (coordinate: ICoordinate) => {
    const airQuality = await callApi(AIR_POLLUTION_API, {
      lat: coordinate?.latitude,
      lon: coordinate?.longitude,
      appid: WEATHER_TOKEN,
    });
    return airQuality.list[0].main.aqi;
  };

  useEffect(() => {
    typeof window !== "undefined" && init();
  }, []);

  const getWeeklyData = async (coordinate: ICoordinate, unit: string) => {
    const weeklyForecast = await callApi(FORECAST_API, {
      units: unit,
      lat: coordinate?.latitude,
      lon: coordinate?.longitude,
      appid: WEATHER_TOKEN,
    });
    if (weeklyForecast) {
      const sortedWeekly: ICurrentForecast[] = weeklyForecast.list.filter(
        (el: any) => date.unix(el.dt).utc(false).isSameOrAfter(date(), "day")
      );
      const currentForecast = await getUnixData(coordinate, unit);

      const addedList = addCurrentTime(sortedWeekly, currentForecast);
      const newWeekly = formatForecastList(addedList);
      setWeeklyList(newWeekly);
    }
  };

  const formatForecastList = (data: ICurrentForecast[]) => {
    const dayArr: number[] = [];
    data?.forEach((el: any) => {
      const day = date.unix(el.dt).utc(false).startOf("day").unix();
      const alreadyAdded = dayArr.find((weekDay: any) => day === weekDay);
      if (!alreadyAdded) dayArr.push(day);
    });
    const formatArr = dayArr.map((el) => {
      const list = data
        .filter((item: any) =>
          date.unix(item.dt).utc(false).isSame(date.unix(el), "day")
        )
        .map((el) => formatForecastData(el));
      const tempSortedList = list.map((item) => item.temp).sort();
      const minTemp = tempSortedList[0];
      const maxTemp = tempSortedList[tempSortedList.length - 1];
      const day = date.unix(el).utc(false);
      const formatDate = day.isToday()
        ? "Today"
        : getDayName(day.format(), "en-US");
      return {
        date: formatDate,
        min: minTemp,
        max: maxTemp,
        icon: list[0].icon,
        list: list,
      };
    });
    return formatArr;
  };

  useEffect(() => {
    if (coordinate.latitude && coordinate.longitude)
      getWeeklyData(coordinate, unit);
  }, [coordinate, unit]);

  return (
    <div></div>
    // <Loader
    //   loading={!(coordinate.latitude && coordinate.longitude)}
    //   className="main"
    // >
    //   <Loader
    //     loading={!forecast}
    //     sx={{
    //       color: "white",
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       width: "20%",
    //       p: 5,
    //       position: "relative",
    //     }}
    //   >
    //     <Box
    //       display="flex"
    //       justifyContent={"space-between"}
    //       alignItems={"center"}
    //       width={"100%"}
    //     >
    //       <CitiesSearch
    //         onSearch={(city) => {
    //           setCoordinate({
    //             latitude: city.latitude.toString(),
    //             longitude: city.longitude.toString(),
    //           });
    //         }}
    //       />{" "}
    //       <DegreeSwitch />
    //     </Box>

    //     <Box display="flex" justifyContent={"space-between"} width={"100%"}>
    //       <Typography fontWeight={600}>{city}</Typography>
    //       <Typography fontWeight={600}>{date().format("hh:mm")}</Typography>
    //     </Box>
    //     <Box display="flex" justifyContent={"space-between"} width={"100%"}>
    //       <Typography fontWeight={600}>
    //         {date().format("MMM DD, YYYY")}
    //       </Typography>
    //     </Box>
    //     <Typography my={3} variant="h2" fontWeight={600}>
    //       {formatUnit(forecast?.temp)}
    //     </Typography>
    //     <Box display={"flex"} gap={2}>
    //       <ForecastIcon size={50} data={forecast!!} />
    //       <Typography
    //         mt={2}
    //         fontWeight={600}
    //         sx={{ textTransform: "capitalize" }}
    //       >
    //         {forecast?.description}
    //       </Typography>
    //     </Box>
    //     <Box
    //       sx={{
    //         position: "absolute",
    //         bottom: 0,
    //         fontSize: 20,
    //         width: "100%",
    //         height: 400,
    //       }}
    //     >
    //       <Image
    //         alt=""
    //         src={require("@/public/images/backgrounds/city.svg")}
    //         style={{
    //           width: "100%",
    //           height: "100%",
    //         }}
    //       />
    //     </Box>
    //   </Loader>

    //   <WeeklyForecast weeklyList={weeklyList} onChange={setForecast} />
    // </Loader>
  );
}
