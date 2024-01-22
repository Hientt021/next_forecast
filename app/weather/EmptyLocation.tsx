import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import WrongLocationIcon from "@mui/icons-material/WrongLocation";
export default function EmptyLocation() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      flexDirection={"column"}
      gap={3}
    >
      <WrongLocationIcon sx={{ fontSize: "120px", color: "Gray" }} />
      <Stack spacing={1} alignItems={"center"}>
        <Typography variant={"h6"} fontWeight={600}>
          Unknown City
        </Typography>
        <Typography variant={"body1"} fontWeight={500} color="GrayText">
          Weather forecast information will appear here after you select a city
        </Typography>
      </Stack>
    </Box>
  );
}
