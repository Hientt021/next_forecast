"use client";

import { getForecast } from "@/src/actions";
import Loader from "@/src/components/common/Loader";
import useAlert from "@/src/hook/useAlert";
import useNavigate from "@/src/hook/useNavigate";
import { date } from "@/src/lib/dayjs/date";
import {
  setAllowAccessLocation,
  setCurrent,
  setLocation,
} from "@/src/lib/redux/features/app/appSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/store";
import { Grid } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ForecastSider from "./components/ForecastSider";
import WeeklyForecast from "./components/WeeklyForecast";
import { IDayForecastList, IForecastData, IHourForecast } from "./type";
export interface ICoordinate {
  name?: string;
  longitude: string;
  latitude: string;
}

export default function WeatherPage() {
  const { unit, device } = useAppSelector((state) => state.app);
  const { isMobileDevice } = device;
  const { query, onQueryChange } = useNavigate();
  const { showAlert } = useAlert();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IForecastData | undefined>(undefined);
  const [isInitial, setIsInitial] = useState(false);
  const [currentDt, setCurrentDt] = useState(0);
  const [weeklyList, setWeeklyList] = useState<IDayForecastList[]>([]);

  const init = async () => {
    try {
      if (query?.latitude && query?.longitude) await fetchData(query);
      else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          onAllowedAccessLocation,
          onDeniedAccessLocation
        );
      }
    } catch (error: any) {
      showAlert(error, "error");
    } finally {
      setIsInitial(true);
      setTimeout(() => setCurrentDt(date().unix()), 600000);
    }
  };

  const fetchData = async (userCoordinate: ICoordinate) => {
    try {
      const forecastRes = await getForecast(userCoordinate);
      if (forecastRes) {
        dispatch(setLocation(forecastRes.location));
        dispatch(setCurrent(forecastRes.current));

        const weekly = await formatDayList(forecastRes);
        setWeeklyList(weekly);
        setData(forecastRes);
        console.log(forecastRes);
      }
    } catch (error: any) {
      showAlert(error, "error");
    }
  };

  const formatDayList = async (data: IForecastData) => {
    const formatHourList = (list: IHourForecast[]) => {
      return list.sort((a, b) => a.time_epoch - b.time_epoch);
    };
    const { current, forecast, location } = data;
    const currentData = {
      ...current,
      time_epoch: current.last_updated_epoch,
    };
    const formatWeekly = forecast.forecastday.map((el, i) => {
      if (!i)
        return {
          ...el,
          hour: formatHourList([...el.hour, currentData] as IHourForecast[]),
        };
      else return el;
    });

    return formatWeekly;
  };

  const onAllowedAccessLocation = async (location: GeolocationPosition) => {
    dispatch(setAllowAccessLocation(true));
    const latitude = location.coords.latitude.toString();
    const longitude = location.coords.longitude.toString();
    if (latitude && longitude) onQueryChange({ ...query, latitude, longitude });
  };

  const onDeniedAccessLocation = async (error: GeolocationPositionError) => {
    dispatch(setAllowAccessLocation(false));
    showAlert("Please choose a city", "info");
  };

  useEffect(() => {
    init();
  }, [query?.latitude, query?.longitude, currentDt]);

  const selectedForecast = useMemo(() => {
    const hours = weeklyList.find((el) =>
      el.hour.find((item) => item.time_epoch === Number(query?.dt))
    )?.hour;

    if (hours) {
      const hour = hours.find((el) => el.time_epoch === Number(query?.dt));
      return hour;
    }
  }, [query?.dt, weeklyList]);

  return (
    <Grid container height={"100%"} pr={2}>
      <Grid
        item
        mobile={12}
        laptop={3}
        sx={{
          color: "white",

          p: isMobileDevice ? 2 : 5,
          position: "relative",
          pt: 1,
          height: "100%",
        }}
      >
        <Loader
          loading={!(selectedForecast && data)}
          height="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ForecastSider data={selectedForecast!!} city={data?.location.name} />
        </Loader>
      </Grid>
      <Grid
        item
        mobile={12}
        laptop={9}
        p={5}
        rowGap={2}
        sx={{
          backgroundColor: isMobileDevice ? "transparent" : "#E3F1FF",
          borderRadius: "6rem",
          height: "calc(100% - 56px)",
          zIndex: 2,
        }}
      >
        <Loader loading={!(isInitial && !!weeklyList.length)} height="100%">
          <WeeklyForecast weeklyList={weeklyList} />
        </Loader>
      </Grid>
    </Grid>
  );
}
