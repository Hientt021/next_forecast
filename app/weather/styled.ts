import Loader from "@/src/components/Loader";
import { styled } from "@mui/material";

interface IStyledWrapper {
  isMobile: boolean;
}

export const StyledWrapper = styled(Loader)(({ isMobile }: IStyledWrapper) => ({
  flexDirection: isMobile ? "column" : "row",
}));
