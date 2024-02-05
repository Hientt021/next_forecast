import Loader, { ILoader } from "@/src/components/common/Loader";
import { Box, BoxProps, Grid, GridProps, styled } from "@mui/material";

type IStyledBox = {
  isMobile?: boolean;
  isIpad?: boolean;
  isDesktop?: boolean;
};
type IStyledWrapper = IStyledBox & { loading?: boolean };
type IStyledScrollable = IStyledBox;

export const StyledWrapper = styled(Box)(
  ({ isMobile, isIpad }: IStyledWrapper) => ({
    flexDirection: isMobile || isIpad ? "column" : "row",
    background: isMobile || isIpad ? "#5C9CE5" : "transparent",
  })
);

export const Scrollable = styled(Box)(
  ({ isMobile, isIpad, isDesktop, ...rest }: IStyledScrollable) => ({
    overflow: "auto",
    paddingRight: "0.5rem",
    paddingBottom: "0.5rem",
    "::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
      paddingLeft: "6px",
      backgroundColor: "#F5F5F5",
      borderRadius: "25px",
    },
    "::-webkit-scrollbar-thumb": {
      background: "rgb(167, 202, 237)",
      borderRadius: "25px",
    },
  })
);
