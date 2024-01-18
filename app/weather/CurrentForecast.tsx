import CardComponent from "@/src/components/CardComponent";
import { date, getDayName } from "@/src/lib/dayjs/date";
import { getIconName } from "@/src/utils/text";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface ICurrentForecast {
  data: any;
}

export default function CurrentForecast(props: ICurrentForecast) {
  const { data } = props;

  return (
    <CardComponent
      sx={{ background: "transparent" }}
      display={"flex"}
      justifyContent={"space-between"}
      p={4}
    >
      <Stack justifyContent={"space-between"}>
        <Typography children={data?.name} variant="h3" fontWeight={600} />
        <Box>
          <Typography
            children={Math.round(data?.main?.temp) + "°"}
            variant="h3"
            fontWeight={600}
          />
          <Typography
            children={data?.weather?.[0].description}
            variant="h6"
            fontWeight={600}
            textTransform={"capitalize"}
          />
        </Box>
      </Stack>
      {data && (
        <Image
          width={200}
          height={200}
          alt="weather-icon"
          src={require("@/public/images/weather_icons/" +
            getIconName(data) +
            ".png")}
        />
      )}
    </CardComponent>
  );
}
