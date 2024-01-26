import CardComponent from "@/src/components/common/CardComponent";
import IconComponent from "@/src/components/icons";
import useNavigate from "@/src/hook/useNavigate";
import { useAppSelector } from "@/src/lib/redux/store";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
interface IWeeklyItem {
  data: any;
  active?: boolean;
  onClick: () => void;
}
export default function WeeklyItem(props: IWeeklyItem) {
  const { data, active = false, onClick } = props;
  const { isMobile } = useAppSelector((state) => state.app.device);
  const { query, createSearchParams } = useNavigate();
  const isLoading = useMemo(() => {
    let result = false;
    Object.keys(data).forEach((key) => {
      if (!data[key]) result = true;
    });
    return result;
  }, [data]);

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
      loading={isLoading}
    >
      <Box
        display={"flex"}
        flexDirection={isMobile ? "row" : "column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
      >
        <Typography fontWeight={600}>{data.date}</Typography>
        <IconComponent size={80} name={data.icon} />
        <Typography fontWeight={600}>{data.min + " / " + data.max}</Typography>
      </Box>
    </CardComponent>
  );
}
