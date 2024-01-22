import Loader, { ILoader } from "@/src/components/Loader";
import { styled } from "@mui/material";

interface IStyledWrapper extends ILoader {
  isMobile: boolean;
  isIpad?: boolean;
}

export const StyledWrapper = styled(Loader)(
  ({ isMobile, isIpad }: IStyledWrapper) => ({
    flexDirection: isMobile || isIpad ? "column" : "row",
    background: isMobile || isIpad ? "#5C9CE5" : "transparent",
  })
);
