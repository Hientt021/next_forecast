import { Box, BoxProps, Stack, Typography } from "@mui/material";
import Image from "next/image";
import WrongLocationIcon from "@mui/icons-material/WrongLocation";
import { useAppSelector } from "@/src/lib/redux/store";
interface IEmptyLocation extends BoxProps {}
export default function EmptyLocation(props: IEmptyLocation) {
  const { isDesktop } = useAppSelector((state) => state.app.device);
  return (
    <Box
      {...props}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      flexDirection={"column"}
      gap={3}
    >
      <WrongLocationIcon
        sx={{ fontSize: "120px", color: isDesktop ? "Gray" : "white" }}
      />
      <Stack spacing={1} alignItems={"center"}>
        <Typography
          variant={"h6"}
          fontWeight={600}
          color={isDesktop ? "black" : "white"}
        >
          Unknown City
        </Typography>
        <Typography
          variant={"body1"}
          fontWeight={500}
          color={isDesktop ? "Gray" : "white"}
          textAlign={"center"}
        >
          Weather forecast information will appear here after you select a city
        </Typography>
      </Stack>
    </Box>
  );
}
