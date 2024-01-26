import { Box } from "@mui/material";
import { GREETING } from "./const";
import { date } from "@/src/lib/dayjs/date";

export default function WeatherLayout(props: { children: React.ReactNode }) {
  const mainTheme = GREETING.find(
    (el) => Number(date().format("HH")) >= el.hour
  );

  return (
    <Box
      sx={{
        background: mainTheme?.color,
        color: "#0A0A0B",
        fontFamily: "'Roboto', sans-serif;",
      }}
    >
      {props.children}
    </Box>
  );
}
