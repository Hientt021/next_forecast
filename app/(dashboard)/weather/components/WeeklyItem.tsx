import CardComponent from "@/src/components/common/CardComponent";
import IconComponent from "@/src/components/icons";
import useNavigate from "@/src/hook/useNavigate";
import { useAppSelector } from "@/src/lib/redux/store";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { IDayForecastList } from "../type";
import useUnit from "@/src/hook/useUnit";
import { date } from "@/src/lib/dayjs/date";
import Image from "next/image";
import { iconCode } from "@/src/const/icon";
import WeatherIcon from "../../../../src/components/icons/WeatherIcon";
interface IWeeklyItem {
  data: IDayForecastList;
  active?: boolean;
  onClick: () => void;
}
export default function WeeklyItem(props: IWeeklyItem) {
  const { data, active = false, onClick } = props;
  const { isMobile } = useAppSelector((state) => state.app.device);
  const { query, createSearchParams } = useNavigate();
  const { formatTemp } = useUnit();

  const isLoading = useMemo(() => {
    let result = false;
    Object.keys(data).forEach((key) => {
      if (!data[key as keyof IDayForecastList]) result = true;
    });
    return result;
  }, [data]);

  return (
    <CardComponent
      key={data.date_epoch}
      p={2}
      width={"100%"}
      sx={{
        background: !active ? "transparent" : "#fff",
        cursor: "pointer",
      }}
      onClick={onClick}
      loading={isLoading}
    >
      <Box
        display={"flex"}
        flexDirection={isMobile ? "row" : "column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
      >
        <Typography fontWeight={600}>
          {date.unix(data.date_epoch).format("MMM DD")}
        </Typography>
        <WeatherIcon code={data.day.condition.code} size={60} />
        <Typography fontWeight={600}>
          {formatTemp(data.day, "avgtemp", { unit: true })}
        </Typography>
      </Box>
    </CardComponent>
  );
}
