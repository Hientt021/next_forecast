import CardComponent from "@/src/components/CardComponent";
import ForecastIcon from "@/src/components/ForecastIcon";
import useNavigate from "@/src/hook/useNavigate";
import { Stack, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
interface IWeeklyItem {
  data: any;
  active?: boolean;
  onClick: () => void;
}
export default function WeeklyItem(props: IWeeklyItem) {
  const { data, active = false, onClick } = props;

  return (
    <CardComponent
      key={data.dt}
      p={2}
      width={"100%"}
      sx={{
        background: !active ? "transparent" : "#fff",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Stack justifyContent={"center"} alignItems={"center"} spacing={1}>
        <Typography fontWeight={600}>{data.date}</Typography>
        <ForecastIcon size={80} data={data} />
        <Typography fontWeight={600}>{data.min + " / " + data.max}</Typography>
      </Stack>
    </CardComponent>
  );
}
